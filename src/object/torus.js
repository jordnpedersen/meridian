'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/material/standard.js';
import {scene} from '/src/main.js';

const geometry = new THREE.TorusGeometry(0.55, 0.15, 16, 64);

/**
 * Adds a torus object to the scene
 */
function addTorus() {
  const torus = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(torus);
}

export {addTorus};