'use strict';

import * as THREE from 'three';
import {scene} from '/src/main.js';

const COLOR = 0xeeeeee;
const INTENSITY = 1;
const HELPER_SIZE = 0.5;

/**
 * Adds an ambient light to the scene with the following properties
 * @param {int} color color value of light represented in hexadecimal
 * @param {float} intensity intensity of light
 */
function addLight(color = COLOR, intensity = INTENSITY) {
  const light = new THREE.AmbientLight(COLOR, INTENSITY);
  scene.add(light);
}

/**
 * Adds a ambient light helper to the scene with the following properties
 * @param {THREE.PointLight} light light to replicate helper for
 * @param {float} helperSize size of helper
 */
function addLightHelper(light, helperSize = HELPER_SIZE) {
  const lightHelper = new THREE.PointLightHelper(light, helperSize, COLOR);
  scene.add(lightHelper);
}

/**
 * Adds an ambient light with a corresponding point light helper to the scene with the following properties
 */
function addLightWithHelper(color = COLOR, intensity = INTENSITY, helperSize = HELPER_SIZE) {
  const light = new THREE.AmbientLight(COLOR, INTENSITY);
  scene.add(light);
  addLightHelper(light, helperSize);
}

export {addLight, addLightWithHelper};
