'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import * as TRANSFORM from '/src/controls/transform.js';
import {scene} from '/src/main.js';

const id = document.getElementById("addKnot");
const geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 96, 16);

/**
 * Adds a knot object to the scene
 */
function addKnot() {
  const knot = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(knot);

  return knot;
}

id.addEventListener("click", () => {
  const knot = addKnot();
  TRANSFORM.controls.attach(knot);
}, false);

export {addKnot};
