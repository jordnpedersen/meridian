'use strict';

import * as THREE from 'three';
import {scene} from '/src/main.js';
import * as NAME from '/src/utils/name.js';
import * as ID from '/src/utils/uuid.js';

const COLOR = 0xf8f8f8;
const INTENSITY = 1;

/**
 * Adds an ambient light to the scene with the following properties
 * @param {int} color color value of light represented in hexadecimal
 * @param {float} intensity intensity of light
 */
function addLight(color = COLOR, intensity = INTENSITY) {
  const light = new THREE.AmbientLight(COLOR, INTENSITY);
  light.name = NAME.getName('ambient');
  scene.add(light);

  ID.assignID(light);
}

export {addLight};
