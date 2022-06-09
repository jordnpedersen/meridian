'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/material/standard.js';
import {scene} from '/src/main.js';

const geometry = new THREE.SphereGeometry(0.65, 32, 16);

/**
 * Adds a sphere object to the scene
 */
function addSphere() {
  const sphere = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(sphere);
}

export {addSphere};
