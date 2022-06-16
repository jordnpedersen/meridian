'use strict';

import * as THREE from 'three';
import {scene, camera, renderer} from '/src/main.js';
import * as OUTLINE from '/src/materials/outline.js';

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

/**
 * Creates a visual outline of an object
 * @param {THREE.Object3D} object object to create outline of
 */
function createOutline(object) {
  if (!outlineExists()) {
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
  try {
    const object = scene.getObjectByName('outline');

    object.scale.x = Math.abs(object.pseudoParent.scale.x) + (camera.position.distanceTo(object.position) * 0.00445355992)
    object.scale.y = Math.abs(object.pseudoParent.scale.y) + (camera.position.distanceTo(object.position) * 0.00445355992)
    object.scale.z = Math.abs(object.pseudoParent.scale.z) + (camera.position.distanceTo(object.position) * 0.00445355992)

    object.position.x = object.pseudoParent.position.x;
    object.position.y = object.pseudoParent.position.y;
    object.position.z = object.pseudoParent.position.z;
  } catch (err) {
    // Do nothing
    console.log(err)
  }
}

export {createOutline, outlineExists, setOutline};
