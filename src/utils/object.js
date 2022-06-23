'use strict';

import * as THREE from 'three';
import * as NAME from '/src/utils/name.js';
import * as ID from '/src/utils/uuid.js';
import * as TRANSFORM from '/src/controls/transform.js';
import {OBJECTS} from '/src/configs/objects.js';
import {MATERIALS} from '/src/configs/materials.js';
import {scene} from '/src/main.js';

const raycasterObjects = [];

/**
 * Adds an object to the scene, and assigns it's UUID embedded in the HTML
 * @param {string} objectName object name to add to scene
 * @param {boolean} attach true if transform controls should automatically be attached to object
 */
function addObject(objectName, attach = true) {
  const object = new THREE.Mesh(OBJECTS[objectName].geometry, MATERIALS.standard);
  object.name = NAME.getName(objectName);
  raycasterObjects.push(object);
  scene.add(object);

  ID.assignID(object);

  if (attach) {
    TRANSFORM.outlineAttach(object);
  }
}

/**
 * Deletes an object from the scene
 * @param {THREE.Object3D} object object to delete from scene
 */
function deleteObject(object) {
  if (object.isMesh) {
    object.geometry.dispose();
    object.material.dispose();
  } else if (object.isLight) {
    const helper = scene.getObjectByName(object.uuid);
    deleteObject(helper);
  }
  scene.remove(object);
}

export {raycasterObjects, addObject, deleteObject};
