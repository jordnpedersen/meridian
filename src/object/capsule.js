'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/material/standard.js';
import {scene} from '/src/main.js';

const geometry = new THREE.CapsuleGeometry(0.65, 0.65, 4, 8);

/**
 * Adds a capsule object to the scene
 */
function addCapsule() {
  const capsule = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(capsule);
}

export {addCapsule};