'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import * as TRANSFORM from '/src/controls/transform.js';
import {scene} from '/src/main.js';

const id = document.getElementById("addCone");
const geometry = new THREE.ConeGeometry(0.5, 1, 32, 4);

/**
 * Adds a cone object to the scene
 */
function addCone() {
  const cone = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(cone);

  return cone;
}

id.addEventListener("click", () => {
  const cone = addCone();
  TRANSFORM.controls.attach(cone);
}, false);

export {addCone};
