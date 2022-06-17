'use strict';

import * as THREE from 'three';
import * as NAME from '/src/utils/name.js';
import * as ID from '/src/utils/uuid.js';
import {scene} from '/src/main.js';
import {raycasterObjects} from '/src/utils/object.js';

const POSITION = [0, 3, 0];
const COLOR = 0xf8f8f8;
const INTENSITY = 1;
const DISTANCE = 1;
const ANGLE = 0.3;
const PENUMBRA = 0.5;
const DECAY = 2;

/**
 * Adds a spotlight to the scene with the following properties.
 * @param {array} position - Position represented as an array containing x, y, z values.
 * @param {hexadecimal} color - Hexadecimal color of the light.
 * @param {float} intensity - Numeric value of the light's strength.
 * @param {float} distance - Maximum range of the light.
 * @param {float} angle - Maximum angle of light dispersion from its direction.
 * @param {float} penumbra - Percent of the spotlight cone that is attenuated due to penumbra.
 * @param {float} decay - The amount the light dims along the distance of the light.
 */
function addLight(position = POSITION, color = COLOR, intensity = INTENSITY, distance = DISTANCE, angle = ANGLE, penumbra = PENUMBRA, decay = DECAY) {
  const light = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
  light.position.set(position[0], position[1], position[2]);
  light.name = NAME.getName('spot');
  scene.add(light);

  ID.assignID(light);

  const helper = new THREE.SpotLightHelper(light);
  helper.isHelper = true;
  scene.add(helper);

  raycasterObjects.push(helper);
}

export {addLight};
