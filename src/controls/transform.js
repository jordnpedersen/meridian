'use strict';

import * as THREE from 'three';
import {TransformControls} from 'TransformControls';
import {scene, camera, renderer, render} from '/src/main.js';
import * as ORBIT from '/src/controls/orbit.js';

let controls;

/**
 * Create transform controller
 */
function createController() {
  controls = new TransformControls(camera, renderer.domElement);

  controls.addEventListener('change', render);
  controls.addEventListener('dragging-changed', function(event) {
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
window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 81: // Q
      controls.setSpace(controls.space === 'local' ? 'world' : 'local');
      break;

    case 16: // Shift
      controls.setTranslationSnap(1);
      controls.setRotationSnap(THREE.MathUtils.degToRad(15));
      controls.setScaleSnap(0.25);
      break;

    case 87: // W
      controls.setMode('translate');
      break;

    case 69: // E
      controls.setMode('rotate');
      break;

    case 82: // R
      controls.setMode('scale');
      break;

    // TODO: Not sure if we should include these cases
    // case 67: // C
    //   const position = camera.position.clone();

    //   camera = camera.isPerspectiveCamera ? cameraOrtho : cameraPersp;
    //   camera.position.copy(position);

    //   orbit.object = camera;
    //   controls.camera = camera;

    //   camera.lookAt(orbit.target.x, orbit.target.y, orbit.target.z);
    //   onWindowResize();
    //   break;

    // case 86: // V
    //   const randomFoV = Math.random() + 0.1;
    //   const randomZoom = Math.random() + 0.1;

    //   cameraPersp.fov = randomFoV * 160;
    //   cameraOrtho.bottom = - randomFoV * 500;
    //   cameraOrtho.top = randomFoV * 500;

    //   cameraPersp.zoom = randomZoom * 5;
    //   cameraOrtho.zoom = randomZoom * 5;
    //   onWindowResize();
    //   break;

    case 187:
    case 107: // +, =, num+
      controls.setSize(controls.size + 0.1);
      break;

    case 189:
    case 109: // -, _, num-
      controls.setSize(Math.max(controls.size - 0.1, 0.1));
      break;

    case 88: // X
      controls.showX = !controls.showX;
      break;

    case 89: // Y
      controls.showY = !controls.showY;
      break;

    case 90: // Z
      controls.showZ = !controls.showZ;
      break;

    case 32: // Spacebar
      controls.enabled = !controls.enabled;
      break;

    case 27: // Esc
      // controls.reset(); // TODO: Implement this somewhere else. Similar to "freeze transformations" option in Maya
      controls.detach();
      break;
  }
});

window.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 16: // Shift
      controls.setTranslationSnap(null);
      controls.setRotationSnap(null);
      controls.setScaleSnap(null);
      break;
  }
});

export {controls, createController};
