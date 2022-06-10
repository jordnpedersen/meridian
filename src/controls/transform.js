'use strict';

import * as THREE from 'three';
import * as ORBIT from '/src/controls/orbit.js';
import {TransformControls} from 'TransformControls';
import {scene, camera, renderer, render} from '/src/main.js';

let controls;

/**
 * Create transform controller
 */
function createController() {
  controls = new TransformControls(camera, renderer.domElement);

  controls.addEventListener('change', render);
  controls.addEventListener('dragging-changed', event => {
    ORBIT.controls.enabled = !event.value;
  });

  // Set a custom property 'static' to let raycaster know to not select transform controller mesh
  // TODO: See if it would be better to create a new method outside that handles this for any object
  controls.static = true;
  controls.traverse(function(child) {
    child.static = true;
  })

  scene.add(controls);
}

/**
 * Event listener for transform shortcuts
 */
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'q':
      controls.setSpace(controls.space === 'local' ? 'world' : 'local');
      break;
    case 'w':
      controls.setMode('translate');
      break;
    case 'e':
      controls.setMode('rotate');
      break;
    case 'r':
      controls.setMode('scale');
      break;
    case 'Shift':
      controls.setTranslationSnap(0.5);
      controls.setRotationSnap(THREE.MathUtils.degToRad(15));
      controls.setScaleSnap(0.5);
      break;
    //   TODO: Not sure if we should include these cases
    // case 'c':
    //   const position = camera.position.clone();
    //   camera = camera.isPerspectiveCamera ? cameraOrtho : cameraPersp;
    //   camera.position.copy(position);
    //   orbit.object = camera;
    //   controls.camera = camera;
    //   camera.lookAt(orbit.target.x, orbit.target.y, orbit.target.z);
    //   onWindowResize();
    //   break;
    // case 'v':
    //   const randomFoV = Math.random() + 0.1;
    //   const randomZoom = Math.random() + 0.1;
    //   cameraPersp.fov = randomFoV * 160;
    //   cameraOrtho.bottom = - randomFoV * 500;
    //   cameraOrtho.top = randomFoV * 500;
    //   cameraPersp.zoom = randomZoom * 5;
    //   cameraOrtho.zoom = randomZoom * 5;
    //   onWindowResize();
    //   break;
    case '+':
      controls.setSize(controls.size + 0.1);
      break;
    case '-':
      controls.setSize(Math.max(controls.size - 0.1, 0.1));
      break;
    case 'x':
      controls.showX = !controls.showX;
      break;
    case 'y':
      controls.showY = !controls.showY;
      break;
    case 'z':
      controls.showZ = !controls.showZ;
      break;
    case ' ':
      controls.enabled = !controls.enabled;
      break;
    case 'Escape':
      // TODO: Implement this somewhere else. Similar to 'freeze transformations' option in Maya
      controls.detach();
      // controls.dispose();
      // controls.reset();
      break;
  }
});

document.addEventListener('keyup', event => {
  switch (event.key) {
    case 'Shift':
      controls.setTranslationSnap(null);
      controls.setRotationSnap(null);
      controls.setScaleSnap(null);
      break;
  }
});

export {controls, createController};