'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import * as TRANSFORM from '/src/controls/transform.js';
import {scene} from '/src/main.js';

const id = document.getElementById("addTorus");
const geometry = new THREE.TorusGeometry(0.4, 0.2, 16, 64);

/**
 * Adds a torus object to the scene
 */
function addTorus() {
  const torus = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(torus);

  return torus;
}

id.addEventListener("click", () => {
  const torus = addTorus();
  TRANSFORM.controls.attach(torus);
}, false);

export {addTorus};
