'use strict';

import * as THREE from 'three';
import * as OUTLINE from '/src/materials/outline.js';
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
 * Creates a visual outline of an object
 * @param {THREE.Object3D} object object to create outline of
 */
function createOutline(object) {
  if (!outlineExists() && object.isMesh) {
    const outlineMesh = new THREE.Mesh(object.geometry, OUTLINE.material);
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

    object.position.x = object.pseudoParent.position.x;
    object.position.y = object.pseudoParent.position.y;
    object.position.z = object.pseudoParent.position.z;

    object.rotation.x = object.pseudoParent.rotation.x;
    object.rotation.y = object.pseudoParent.rotation.y;
    object.rotation.z = object.pseudoParent.rotation.z;
  } catch (err) {
  }
}

export {createOutline, deleteOutline, setOutline, outlineExists};
