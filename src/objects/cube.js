'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import * as TRANSFORM from '/src/controls/transform.js';
import {scene} from '/src/main.js';

const id = document.getElementById("addCube");
const geometry = new THREE.BoxGeometry(1, 1, 1);

/**
 * Adds a cube object to the scene
 */
function addCube() {
  const cube = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(cube);

  return cube;
}

id.addEventListener("click", () => {
  const cube = addCube();
  TRANSFORM.controls.attach(cube);
}, false);

export {addCube};
