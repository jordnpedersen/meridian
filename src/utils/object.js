'use strict';

import * as THREE from 'three';
import * as NAME from '/src/utils/name.js';
import * as ID from '/src/utils/uuid.js';
import * as TRANSFORM from '/src/controls/transform.js';
import * as HISTORY from '/src/history/history.js';
import {createCommand} from '/src/history/command.js';
import {OBJECTS} from '/src/configs/objects.js';
import {MATERIALS} from '/src/configs/materials.js';
import {deleteOutline, isOutline} from '/src/utils/outline.js';
import {scene} from '/src/main.js';

const raycasterObjects = [];

/**
 * Adds an object to the scene, and assigns it's UUID embedded in the HTML
 * @param {string} objectName object name to add to scene
 * @param {boolean} attach true if transform controls should automatically be attached to object
 */
function addObject(objectName, attach = true, objectParams = undefined) {
  const object = new THREE.Mesh(OBJECTS[objectName].geometry, MATERIALS.standard);
  object.geometry.name = objectName;
  object.name = NAME.getName(objectName);

  // object.lastPosition = new THREE.Vector3(0, 0, 0);
  // object.lastRotation = new THREE.Euler(0, 0, 0);
  // object.lastScale = new THREE.Vector3(1, 1, 1);

  if (objectParams !== undefined) {
    object.name = objectParams.name;
    Object.defineProperty(object, 'id', {
      value: objectParams.id,
      writeable: true
    })
    // object.id = objectParams.id;
  }

  raycasterObjects.push(object);
  scene.add(object);

  ID.assignID(object);

  if (attach) {
    TRANSFORM.outlineAttach(object);
  }

  HISTORY.add(createCommand('add', object));
}

/**
 * Deletes an object from the scene
 * @param {THREE.Object3D} object object to delete from scene
 */
function deleteObject(object, isUndo = false) {
  if (object.isMesh) {
    if (TRANSFORM.controls.object === object) {
      deleteOutline();
    }
    object.geometry.dispose();
    object.material.dispose();
  } else if (object.isLight) {
    const helper = scene.getObjectByName(object.uuid);
    deleteObject(helper, true); // maybe isUndo should always be true in this scenario
  }

  if (!isOutline(object) && !isUndo) {
    HISTORY.add(createCommand('delete', object));
    ID.removeID(object.id);
  }

  const objIdx = containsObject(object, raycasterObjects);

  if (objIdx !== -1) {
    raycasterObjects.splice(objIdx, 1);
  }

  scene.remove(object);
}

/**
 *
 * @param {THREE.Object3D} obj object to check if in list
 * @param {*} list list to check if object is in
 * @returns
 */
function containsObject(obj, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return i;
    }
  }

  return -1;
}

export {raycasterObjects, addObject, deleteObject};
