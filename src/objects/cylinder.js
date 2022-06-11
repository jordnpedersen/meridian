'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import {scene} from '/src/main.js';

const id = document.getElementById("cylinder");
const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

/**
 * Adds a cylinder object to the scene
 */
function addCylinder() {
  const cylinder = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(cylinder);
}

id.addEventListener("click", () => {addCylinder()}, false);

export {addCylinder};
