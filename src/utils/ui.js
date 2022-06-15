'use strict';

import * as TRANSFORM from '/src/controls/transform.js';
import {scene} from '/src/main.js';
import {ui} from '/src/configs/ui.js';

/**
 * Updates UI position
 * @param {float} x x position
 * @param {float} y y position
 * @param {z} z z position
 */
function updateUIposition(x, y, z) {
  ui.position.x.value = x;
  ui.position.y.value = y;
  ui.position.z.value = z;
}

/**
 * Updates UI rotation
 * @param {float} x x rotation
 * @param {float} y y rotation
 * @param {float} z z rotation
 */
function updateUIrotation(x, y, z) {
  ui.rotation.x.value = x;
  ui.rotation.y.value = y;
  ui.rotation.z.value = z;
}

/**
 * Updates UI scale
 * @param {float} x x scale
 * @param {float} y y scale
 * @param {float} z z scale
 */
function updateUIscale(x, y, z) {
  ui.scale.x.value = x;
  ui.scale.y.value = y;
  ui.scale.z.value = z;
}

/**
 * Updates material color of 'object'
 * @param {THREE.Object3D} object
 */
function updateMaterialColor(object) {
  const color = ui.color.value.replace('#', '0x');
  object.material.color.setHex(color);
}

/**
 * Resets UI to default parameters
 */
function resetUI() {
  updateUIposition(0, 0, 0);
  updateUIrotation(0, 0, 0);
  updateUIscale(0, 0, 0);

}

/**
 * Updates UI. Should probably seperate functionality with updating material color.
 */
function updateUI() {
  if (TRANSFORM.controls.object === undefined) {
    resetUI();
  } else {
    updateUIposition(TRANSFORM.controls.object.position.x, TRANSFORM.controls.object.position.y, TRANSFORM.controls.object.position.z);
    updateUIrotation(TRANSFORM.controls.object.rotation.x, TRANSFORM.controls.object.rotation.y, TRANSFORM.controls.object.rotation.z);
    updateUIscale(TRANSFORM.controls.object.scale.x, TRANSFORM.controls.object.scale.y, TRANSFORM.controls.object.scale.z);
    updateMaterialColor(TRANSFORM.controls.object);
  }
}

/**
 * Attaches transform controls to selected UI object from scene
 */
document.getElementById('sceneObjects').addEventListener('click', event => {
  const object = scene.getObjectById(parseInt(event.target.id));
  if (object !== undefined) {
    TRANSFORM.controls.attach(object);
  }
});

export {updateUI};
