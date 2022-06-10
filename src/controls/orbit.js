'use strict';

import {OrbitControls} from 'OrbitControls';
import {camera, renderer} from '/src/main.js';

let controls;

/**
 * Create orbit controller
 */
function createController() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2;
  controls.maxDistance = 50;
}

export {controls, createController}
