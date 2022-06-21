'use strict';

import * as TRANSFORM from '/src/controls/transform.js';
import UI from '/src/configs/ui.js';
import {scene} from '/src/main.js';

/**
 * Updates UI position
 * @param {float} x x position
 * @param {float} y y position
 * @param {z} z z position
 */
function updateUIposition(x, y, z) {
  UI.position.x.value = x;
  UI.position.y.value = y;
  UI.position.z.value = z;
}

/**
 * Updates UI rotation
 * @param {float} x x rotation
 * @param {float} y y rotation
 * @param {float} z z rotation
 */
function updateUIrotation(x, y, z) {
  UI.rotation.x.value = x;
  UI.rotation.y.value = y;
  UI.rotation.z.value = z;
}

/**
 * Updates UI scale
 * @param {float} x x scale
 * @param {float} y y scale
 * @param {float} z z scale
 */
function updateUIscale(x, y, z) {
  UI.scale.x.value = x;
  UI.scale.y.value = y;
  UI.scale.z.value = z;
}

/**
 * Updates material color of 'object'
 * @param {THREE.Object3D} object object to update material color of
 */
function updateObjectMaterialColor(object) {
  const color = UI.color.value.replace('#', '0x');

  object.material.color.setHex(color);
}

/**
 * Updates material color of 'light'
 * @param {THREE.Object3D} light light to update material color of
 */
function updateLightMaterialColor(light) {
  const color = UI.color.value.replace('#', '0x');

  light.color.setHex(color);
}

/**
 * Updates material UI
 * @param {THREE.Object3D} object object to get material properties from
 */
function updateMaterialProperties(object) {
  if (object.isMesh) {
    UI.color.value = '#' + object.material.color.getHexString();
    UI.metalness.value = object.material.metalness;
    UI.opacity.value = object.material.opacity;
    UI.roughness.value = object.material.roughness;
  } else if (object.isLight) {
    UI.color.value = '#' + object.color.getHexString();
  }
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
 * Updates all UI elements
 * Should probably seperate functionality with updating material color
 */
function updateUI() {
  if (TRANSFORM.controls.object === undefined) {
    resetUI();
  } else {
    updateUIposition(TRANSFORM.controls.object.position.x, TRANSFORM.controls.object.position.y, TRANSFORM.controls.object.position.z);
    updateUIrotation(TRANSFORM.controls.object.rotation.x, TRANSFORM.controls.object.rotation.y, TRANSFORM.controls.object.rotation.z);
    updateUIscale(TRANSFORM.controls.object.scale.x, TRANSFORM.controls.object.scale.y, TRANSFORM.controls.object.scale.z);
    updateMaterialProperties(TRANSFORM.controls.object);
  }
}

/**
 * Updates the object's material color upon input
 */
ui.color.addEventListener('input', event => {
  if (TRANSFORM.controls.object !== undefined) {
    if (TRANSFORM.controls.object.isMesh) {
      updateObjectMaterialColor(TRANSFORM.controls.object);
    } else if (TRANSFORM.controls.object.isLight) {
      updateLightMaterialColor(TRANSFORM.controls.object);
    }
  }
});

/**
 * Attaches transform controls to selected UI object from scene
 */
document.getElementById('sceneObjects').addEventListener('click', event => {
  const object = scene.getObjectById(parseInt(event.target.id));

  if (object !== undefined) {
    TRANSFORM.outlineAttach(object);
  }
});

export {updateUI};
