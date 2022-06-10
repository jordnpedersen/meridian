'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import {scene} from '/src/main.js';

const geometry = new THREE.CapsuleGeometry(0.5, 1, 8, 16);

/**
 * Adds a capsule object to the scene
 */
function addCapsule() {
  const capsule = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(capsule);
}

export {addCapsule};
