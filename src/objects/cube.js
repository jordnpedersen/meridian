'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import {scene} from '/src/main.js';

const id = document.getElementById("cube");
const geometry = new THREE.BoxGeometry(1, 1, 1);

/**
 * Adds a cube object to the scene
 */
function addCube() {
  const cube = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(cube);
}

id.addEventListener("click", () => {addCube()}, false);

export {addCube};
