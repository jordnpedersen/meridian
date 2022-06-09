'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/material/standard.js';
import {scene} from '/src/main.js';

const geometry = new THREE.CylinderGeometry(.65, .65, 1, 16);

/**
 * Adds a cylinder object to the scene
 */
function addCylinder() {
  const cylinder = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(cylinder);
}

export {addCylinder};
