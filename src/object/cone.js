'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/material/standard.js';
import {scene} from '/src/main.js';

const geometry = new THREE.ConeGeometry(0.65, 1, 16);

/**
 * Adds a cone object to the scene
 */
function addCone() {
  const cone = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(cone);
}

export {addCone};
