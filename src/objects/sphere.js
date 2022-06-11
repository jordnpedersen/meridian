'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import * as TRANSFORM from '/src/controls/transform.js';
import {scene} from '/src/main.js';

const id = document.getElementById("sphere");
const geometry = new THREE.SphereGeometry(0.5, 32, 32);

/**
 * Adds a sphere object to the scene
 */
function addSphere() {
  const sphere = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(sphere);

  return sphere;
}

id.addEventListener("click", () => {
  const sphere = addSphere();
  TRANSFORM.controls.attach(sphere);
}, false);

export {addSphere};
