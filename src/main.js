'use strict';

import * as THREE from 'three';

import * as ORBIT from '/src/controls/orbit.js';
import * as PERSPECTIVE from '/src/camera/perspective.js';
import * as POINT from '/src/light/point.js';
import * as TRANSFORM from '/src/controls/transform.js';

import {addCapsule} from '/src/object/capsule.js';
import {addCone} from '/src/object/cone.js';
import {addCube} from '/src/object/cube.js';
import {addCylinder} from '/src/object/cylinder.js';
import {addKnot} from '/src/object/knot.js';
import {addSphere} from '/src/object/sphere.js';
import {addTorus} from '/src/object/torus.js';

import {raycast} from '/src/raycast.js';

let scene, camera, renderer;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  // scene.fog = new THREE.FogExp2(0x000000, 0.01);

  camera = PERSPECTIVE.createCamera();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  ORBIT.createController();

  const grid = new THREE.GridHelper(30, 30, 0x333333, 0x222222);
  scene.add(grid);

  const axes = new THREE.AxesHelper(1.5);
  axes.setColors(0xff0000, 0x00ff00, 0x0000ff);
  scene.add(axes);

  // addCapsule();
  // addCone();
  addCube();
  // addCylinder();
  // addKnot();
  // addSphere();
  // addTorus();

  TRANSFORM.createController();

  const light = new THREE.AmbientLight(0xeeeeee);
  scene.add(light);

  POINT.addLight([3, 3, 3]);
  POINT.addLight([-1, 6, -3]);

  window.addEventListener('resize', onWindowResize);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
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
  render();
}

document.oncontextmenu = () => false;

export {scene, camera, renderer, render};
