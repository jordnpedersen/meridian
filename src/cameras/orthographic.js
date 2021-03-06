'use strict';

import * as THREE from 'three';

const frustum = 8;
const aspect = window.innerWidth / window.innerHeight;

const LEFT = frustum * aspect / - 2;
const RIGHT = frustum * aspect / 2;
const TOP = frustum / 2;
const BOTTOM = frustum / - 2;
const NEAR = - 500;
const FAR = 500;
const POS = [0, 3, 9];

/**
 * Creates and returns an orthographic camera with the following properties
 * @param {float} left camera frustum left plane
 * @param {float} right camera frustum right plane
 * @param {float} top camera frustum top plane
 * @param {float} bottom camera frustum bottom plane
 * @param {float} near near-plane cut-off distance
 * @param {float} far far-plane cut-off distance
 * @param {array} pos position represented as 1D array containing x, y, z values
 * @returns orthographic camera object
 */
function createCamera(left = LEFT, right = RIGHT, top = TOP, bottom = BOTTOM, near = NEAR, far = FAR, pos = POS) {
  const camera = new THREE.OrthographicCamera(LEFT, RIGHT, TOP, BOTTOM, NEAR, FAR);
  camera.position.set(pos[0], pos[1], pos[2]);
  camera.lookAt(0, 0, 0);

  return camera;
}

export {createCamera};
