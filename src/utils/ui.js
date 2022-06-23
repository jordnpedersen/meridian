'use strict';

import * as THREE from 'three';
import * as TRANSFORM from '/src/controls/transform.js';
import * as BASIC from '/src/materials/basic.js';
import * as LAMBERT from '/src/materials/lambert.js';
import * as NORMAL from '/src/materials/normal.js';
import * as PHONG from '/src/materials/phong.js';
import * as STANDARD from '/src/materials/standard.js';
import UI from '/src/configs/ui.js';
import {mouseOverSettings} from '/src/events/settings.js';
import {scene, camera} from '/src/main.js';

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
 * Checks to see if event pressed is the 'scene' UI element
 * @param {event} event
 * @returns true if scene section is in event's path array
 */
function clickedUI(event) {
  for (let i = 0; i < event.composedPath().length; i++) {
    if (event.composedPath()[i] === UI.file ||
      event.composedPath()[i] === UI.edit ||
      event.composedPath()[i] === UI.add ||
      event.composedPath()[i] === UI.help ||
      event.composedPath()[i] === UI.settings ||
      event.composedPath()[i] === UI.viewHelper ||
      event.composedPath()[i] === UI.hotkeys) {
      return true;
    }
  }

  return false;
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
  if (TRANSFORM.controls.dragging || (!TRANSFORM.controls.dragging && !mouseOverSettings)) {
    if (TRANSFORM.controls.object === undefined) {
      resetUI();
    } else {
      updateUIposition(TRANSFORM.controls.object.position.x, TRANSFORM.controls.object.position.y, TRANSFORM.controls.object.position.z);
      updateUIrotation(TRANSFORM.controls.object.rotation.x, TRANSFORM.controls.object.rotation.y, TRANSFORM.controls.object.rotation.z);
      updateUIscale(TRANSFORM.controls.object.scale.x, TRANSFORM.controls.object.scale.y, TRANSFORM.controls.object.scale.z);
      updateMaterialProperties(TRANSFORM.controls.object);
    }
  }
}

export {updateUI, clickedUI};
