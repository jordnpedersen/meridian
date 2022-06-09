'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/material/standard.js';
import {scene} from '/src/main.js';

const geometry = new THREE.TorusKnotGeometry(0.35, 0.1, 64, 16);

/**
 * Adds a knot object to the scene
 */
function addKnot() {
  const knot = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(knot);
}

export {addKnot};
