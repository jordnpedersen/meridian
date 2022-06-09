'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/material/standard.js';
import {scene} from '/src/main.js';

const geometry = new THREE.BoxGeometry(1, 1, 1);

/**
 * Adds a cube object to the scene
 */
function addCube() {
  const cube = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(cube);
}

export {addCube};
