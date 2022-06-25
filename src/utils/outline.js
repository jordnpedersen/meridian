'use strict';

import * as THREE from 'three';
import {MATERIALS} from '/src/configs/materials.js';
import {scene, camera} from '/src/main.js';
import {deleteObject} from '/src/utils/object.js';

/**
 * Checks to see if an outline mesh already exists
 * @returns true if any outline mesh already exists in the scene
 */
function outlineExists() {
  if (scene.getObjectByName('outline') !== undefined) {
    return true;
  }

  return false;
}

function deleteOutline() {
  const outline = scene.getObjectByName('outline');
  deleteObject(outline);
}

/**
 * Checks to see if an object is an outline or not
 * @param {THREE.Object3D} object object to check if outline
 * @returns true if object is an outline
 */
function isOutline(object) {
  if (object.name === 'outline' && Object.hasOwn(object, 'pseudoParent')) {
    return true;
  }

  return false;
}

/**
 * Creates a visual outline of an object
 * @param {THREE.Object3D} object object to create outline of
 */
function createOutline(object) {
  if (!outlineExists() && object.isMesh) {
    const outlineMesh = new THREE.Mesh(object.geometry, MATERIALS.outline);
    outlineMesh.position.copy(object.position);
    outlineMesh.static = true;
    outlineMesh.pseudoParent = object;
    outlineMesh.name = 'outline';
    scene.add(outlineMesh);
  }
}

/**
 * Sets the position and scale of current object outline
 * To be called from animate()
 */
function setOutline() {
  try { // TODO: Maybe use `if (outlineExists())` instead of try/catch
    const object = scene.getObjectByName('outline');

    object.position.x = object.pseudoParent.position.x;
    object.position.y = object.pseudoParent.position.y;
    object.position.z = object.pseudoParent.position.z;

    object.rotation.x = object.pseudoParent.rotation.x;
    object.rotation.y = object.pseudoParent.rotation.y;
    object.rotation.z = object.pseudoParent.rotation.z;

    // TODO: Temporary fix, make something more elegant later
    if (object.geometry.type !== 'TorusKnotGeometry') {
      object.scale.x = Math.abs(object.pseudoParent.scale.x) + (camera.position.distanceTo(object.position) * 0.005);
      object.scale.y = Math.abs(object.pseudoParent.scale.y) + (camera.position.distanceTo(object.position) * 0.005);
      object.scale.z = Math.abs(object.pseudoParent.scale.z) + (camera.position.distanceTo(object.position) * 0.005);
    } else {
      object.scale.x = object.pseudoParent.scale.x + (camera.position.distanceTo(object.position) * 0.005);
      object.scale.y = object.pseudoParent.scale.y + (camera.position.distanceTo(object.position) * 0.005);
      object.scale.z = object.pseudoParent.scale.z + (camera.position.distanceTo(object.position) * 0.005);
    }
  } catch (err) {
  }
}

export {createOutline, deleteOutline, setOutline, outlineExists, isOutline};
