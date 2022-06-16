'use strict';

import * as THREE from 'three';

const LEFT = - 600 * window.innerWidth / window.innerHeight;
const RIGHT = 600 * window.innerWidth / window.innerHeight;
const TOP = 600;
const BOTTOM = - 600;
const NEAR = 0.1;
const FAR = 100;
const POS = [0, 3, 6];

/**
 * Creates and returns a perspective camera with the following properties
 * @param {array} pos position represented as 1D array containing x, y, z values
 * @param {float} fov field of view
 * @param {float} near near-plane cut-off distance
 * @param {float} far far-plane cut-off distance
 * @returns perspective camera object
 */
function createCamera(left = LEFT, right = RIGHT, top = TOP, bottom = BOTTOM, near = NEAR, far = FAR, pos = POS) {
  const camera = new THREE.OrthographicCamera(LEFT, RIGHT, TOP, BOTTOM, NEAR, FAR);
  camera.position.set(pos[0], pos[1], pos[2]);
  camera.lookAt(0, 0, 0);

  return camera;
}

export {createCamera};
