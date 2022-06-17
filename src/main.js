'use strict';

import * as THREE from 'three';
import * as PERSPECTIVE from '/src/cameras/perspective.js';
import * as ORTHOGRAPHIC from '/src/cameras/orthographic.js';
import * as ORBIT from '/src/controls/orbit.js';
import * as TRANSFORM from '/src/controls/transform.js';
import * as OBJECT from '/src/utils/object.js';
import * as AMBIENT from '/src/lights/ambient.js';
import * as POINT from '/src/lights/point.js';
import * as UI from '/src/utils/ui.js';
import {raycast} from '/src/raycast.js';
import {setOutline} from '/src/utils/outline.js';
import '/src/events.js';

let scene, perspective, orthographic, camera, renderer;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080808);
  scene.fog = new THREE.FogExp2(0x080808, 0.03);

  perspective = PERSPECTIVE.createCamera();
  orthographic = ORTHOGRAPHIC.createCamera();
  camera = perspective;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  ORBIT.createController();

  TRANSFORM.createController();

  const grid = new THREE.GridHelper(500, 500, 0x282828, 0x181818);
  scene.add(grid);

  OBJECT.addObject('cube', false);

  AMBIENT.addLight();

  POINT.addLightWithHelper([1, 3, -3], 0x408040);
  POINT.addLightWithHelper([3, 3, 3], 0x804040);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  });
}

/**
 * Toggles between orthographic / perspective camera
 */
function updateCamera() {
  camera = camera.isPerspectiveCamera ? orthographic : perspective;
}

/**
 * Renders the scene
 * Seperated from 'animate()' function for performance reasons as this function needs to be called elsewhere
 */
function render() {
  renderer.render(scene, camera);
}

/**
 * Updates the scene
 * Required for orbit controls and raycasting
 */
function animate() {
  requestAnimationFrame(animate);
  raycast();
  setOutline();
  UI.updateUI();
  render();
}

document.oncontextmenu = () => false;

export {scene, camera, perspective, renderer, render, updateCamera};
