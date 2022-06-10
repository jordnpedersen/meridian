'use strict';

import * as THREE from 'three';
import {scene} from '/src/main.js';

const POS = [1, 3, 1];
const COLOR = 0xeeeeee;
const INTENSITY = 1;
const DISTANCE = 0;
const DECAY = 2;
const HELPER_SIZE = 1;

/**
 * Adds a point light to the scene with the following properties
 * @param {array} pos position represented as 1D array containing x, y, z values
 * @param {int} color color value of light represented in hexadecimal
 * @param {float} intensity intensity of light
 * @param {float} distance distance of light from origin
 * @param {float} decay decay of light
 */
function addLight(pos = POS, color = COLOR, intensity = INTENSITY, distance = DISTANCE, decay = DECAY) {
  const pointLight = new THREE.PointLight(color, intensity, distance, decay);
  pointLight.position.set(pos[0], pos[1], pos[2]);
  scene.add(pointLight);
}

/**
 * Adds a point light helper to the scene with the following properties
 * @param {THREE.PointLight} light light to replicate helper for
 * @param {float} helperSize size of helper
 */
function addLightHelper(light, helperSize = HELPER_SIZE) {
  const pointLightHelper = new THREE.PointLightHelper(light, helperSize);
  scene.add(pointLightHelper);
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
  const pointLight = new THREE.PointLight(color, intensity, distance, decay);
  pointLight.position.set(pos[0], pos[1], pos[2]);
  addLightHelper(pointLight, helperSize);
}

export {addLight, addLightHelper, addLightWithHelper};