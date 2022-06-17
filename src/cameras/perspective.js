'use strict';

import * as THREE from 'three';

const FOV = 50;
const NEAR = 0.1;
const FAR = 250;
const POS = [0, 3, 9];

/**
 * Creates and returns a perspective camera with the following properties
 * @param {float} fov field of view
 * @param {float} near near-plane cut-off distance
 * @param {float} far far-plane cut-off distance
 * @param {array} pos position represented as 1D array containing x, y, z values
 * @returns perspective camera object
 */
function createCamera(fov = FOV, near = NEAR, far = FAR, pos = POS) {
  const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, NEAR, FAR);
  camera.position.set(pos[0], pos[1], pos[2]);
  camera.lookAt(0, 0, 0);

  return camera;
}

export {createCamera};
