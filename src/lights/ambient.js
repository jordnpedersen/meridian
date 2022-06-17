'use strict';

import * as THREE from 'three';
import * as NAME from '/src/utils/name.js';
import * as ID from '/src/utils/uuid.js';
import {scene} from '/src/main.js';

const COLOR = 0xf8f8f8;
const INTENSITY = 1;

/**
 * Adds an ambient light to the scene with the following properties.
 * @param {hexadecimal} color - Hexadecimal color of the light.
 * @param {float} intensity - Numeric value of the light's strength.
 */
function addLight(color = COLOR, intensity = INTENSITY) {
  const light = new THREE.AmbientLight(COLOR, INTENSITY);
  light.name = NAME.getName('ambient');
  scene.add(light);

  ID.assignID(light);
}

export {addLight};
