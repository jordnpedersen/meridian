'use strict';

import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';
import * as DEFAULT from '/src/config/default.js'
import {addCube} from "/src/objects/cube.js"

let scene, camera, renderer, cube;


init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  // scene.fog = new THREE.FogExp2(0x000000, 0.01);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 3, 6);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.maxDistance = 50;

  const grid = new THREE.GridHelper(30, 30, 0x333333, 0x222222);
  scene.add(grid);

  const axes = new THREE.AxesHelper(1.5);
  axes.setColors(0xff0000, 0x00ff00, 0x0000ff);
  scene.add(axes);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  cube = new THREE.Mesh(geometry, DEFAULT.material);
  scene.add(cube);

  addCube(); // TODO: Remove this line, just testing functionality

  const light = new THREE.AmbientLight(0xeeeeee);
  scene.add(light);

  const light2 = new THREE.PointLight(0xeeeeee, 1, 0, 2);
  light2.position.set(3, 3, 3);
  scene.add(light2);

  const light3 = new THREE.PointLight(0xeeeeee, 1, 0, 2);
  light3.position.set(-1, 6, -3);
  scene.add(light3);

  window.addEventListener('resize', onWindowResize);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;

  renderer.render(scene, camera);
}

document.oncontextmenu = () => false;

export { scene }