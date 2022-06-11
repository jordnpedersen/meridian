'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import {scene} from '/src/main.js';

const id = document.getElementById("knot");
const geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 96, 16);

/**
 * Adds a knot object to the scene
 */
function addKnot() {
  const knot = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(knot);
}

id.addEventListener("click", () => {addKnot()}, false);

export {addKnot};
