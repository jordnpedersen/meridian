'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import {scene} from '/src/main.js';

const geometry = new THREE.SphereGeometry(0.5, 32, 32);

/**
 * Adds a sphere object to the scene
 */
function addSphere() {
  const sphere = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(sphere);
}

export {addSphere};
