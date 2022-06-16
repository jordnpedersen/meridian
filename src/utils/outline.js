'use strict';

import * as THREE from 'three';
import * as OUTLINE from '/src/materials/outline.js';

/**
 * Creates a visual outline of an object
 * @param {THREE.Object3D} object object to create outline of
 */
function createOutline(object) {
  if (!object.hasOutline) {
    const outlineMesh = new THREE.Mesh(object.geometry, OUTLINE.material);
    outlineMesh.position.copy(object.position);
    outlineMesh.scale.multiplyScalar(1.05);
    outlineMesh.static = true;
    outlineMesh.name = 'outline';
    object.add(outlineMesh);
    object.hasOutline = true;
  }
}

export {createOutline};
