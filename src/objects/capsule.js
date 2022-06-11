'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import * as TRANSFORM from '/src/controls/transform.js';
import {scene} from '/src/main.js';

const id = document.getElementById("addCapsule");
const geometry = new THREE.CapsuleGeometry(0.5, 1, 8, 16);

/**
 * Adds a capsule object to the scene
 */
function addCapsule() {
  const capsule = new THREE.Mesh(geometry, STANDARD.material);
  scene.add(capsule);

  return capsule;
}

id.addEventListener("click", () => {
  const capsule = addCapsule();
  TRANSFORM.controls.attach(capsule);
}, false);

export {addCapsule};
