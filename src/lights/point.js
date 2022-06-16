'use strict';

import * as THREE from 'three';
import {scene} from '/src/main.js';
import * as NAME from '/src/utils/name.js';
import * as ID from '/src/utils/uuid.js';
import * as TRANSFORM from '/src/controls/transform.js';
import {raycasterObjects} from '/src/utils/object.js';

const POS = [0, 0, 0];
const COLOR = 0xeeeeee;
const INTENSITY = 1;
const DISTANCE = 0;
const DECAY = 2;
const HELPER_SIZE = 0.3;

/**
 * Adds a point light to the scene with the following properties
 * @param {array} pos position represented as 1D array containing x, y, z values
 * @param {int} color color value of light represented in hexadecimal
 * @param {float} intensity intensity of light
 * @param {float} distance distance of light from origin
 * @param {float} decay decay of light
 */
function addLight(pos = POS, color = COLOR, intensity = INTENSITY, distance = DISTANCE, decay = DECAY) {
  const light = new THREE.PointLight(color, intensity, distance, decay);
  light.position.set(pos[0], pos[1], pos[2]);
  scene.add(light);
}

/**
 * Adds a point light helper to the scene with the following properties
 * @param {THREE.PointLight} light light to replicate helper for
 * @param {float} helperSize size of helper
 */
function addLightHelper(light, helperSize = HELPER_SIZE, color) {
  const lightHelper = new THREE.PointLightHelper(light, helperSize, color);
  lightHelper.name = light.uuid;
  lightHelper.isHelper = true;
  scene.add(lightHelper);

  raycasterObjects.push(lightHelper);
}

/**
 * Adds a point light with a corresponding point light helper to the scene with the following properties
 * @param {array} pos position represented as 1D array containing x, y, z values
 * @param {int} color color value of light represented in hexadecimal
 * @param {float} intensity intensity of light
 * @param {float} distance distance of light from origin
 * @param {float} decay decay of light
 * @param {float} helperSize size of helper
 */
function addLightWithHelper(pos = POS, color = COLOR, intensity = INTENSITY, distance = DISTANCE, decay = DECAY, helperSize = HELPER_SIZE) {
  const light = new THREE.PointLight(color, intensity, distance, decay);
  light.position.set(pos[0], pos[1], pos[2]);
  light.name = NAME.getName('light');
  scene.add(light);

  ID.assignID(light);

  TRANSFORM.outlineAttach(light);

  addLightHelper(light, helperSize, color);
}

export {addLight, addLightHelper, addLightWithHelper};
