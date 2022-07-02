'use strict';

import * as THREE from 'three';
import * as TRANSFORM from '/src/controls/transform.js';
import * as NAME from '/src/utils/name.js';
import * as ID from '/src/utils/uuid.js';
import {scene} from '/src/main.js';
import {raycasterObjects} from '/src/utils/object.js';

const POSITION = [0, 3, 0];
const COLOR = 0xf8f8f8;
const INTENSITY = 1;
const DISTANCE = 0;
const DECAY = 2;
const SIZE = 0.3;

/**
 * Adds a point light to the scene with the following properties.
 * @param {array} position - Position represented as an array containing x, y, z values.
 * @param {hexadecimal} color - Hexadecimal color of the light.
 * @param {float} intensity - Numeric value of the light's strength.
 * @param {float} distance - Maximum range of the light.
 * @param {float} decay - The amount the light dims along the distance of the light.
 * @param {float} size - The size of the helper.
 */
function addLight(attach = true, position = POSITION, color = COLOR, intensity = INTENSITY, distance = DISTANCE, decay = DECAY, size = SIZE) {
  const light = new THREE.PointLight(color, intensity, distance, decay);
  light.position.set(position[0], position[1], position[2]);
  light.name = NAME.getName('point');
  scene.add(light);

  ID.assignID(light);

  if (attach) {
    TRANSFORM.outlineAttach(light);
  }

  const helper = new THREE.PointLightHelper(light, size);
  helper.name = light.uuid;
  helper.isHelper = true;
  scene.add(helper);

  raycasterObjects.push(helper);
}

export {addLight};
