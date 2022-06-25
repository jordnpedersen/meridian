'use strict';

import * as THREE from 'three';
import * as ORBIT from '/src/controls/orbit.js';
import * as TRANSFORM from '/src/controls/transform.js';
import {camera, perspective, updateCamera} from '/src/main.js';
import {deleteOutline} from '/src/utils/outline.js';

/**
 * Event listener for transform shortcuts
 */
document.addEventListener('keydown', event => {
  if (TRANSFORM.controls.object !== undefined) {
    switch (event.key) {
      case 'q':
        TRANSFORM.controls.setSpace(TRANSFORM.controls.space === 'local' ? 'world' : 'local');
        break;
      case 'w':
        TRANSFORM.controls.setMode('translate');
        break;
      case 'e':
        TRANSFORM.controls.setMode('rotate');
        break;
      case 'r':
        TRANSFORM.controls.setMode('scale');
        break;
      case 'a':
        TRANSFORM.controls.setSize(TRANSFORM.controls.size + 0.1);
        break;
      case 's':
        TRANSFORM.controls.setSize(Math.max(TRANSFORM.controls.size - 0.1, 0.1));
        break;
      case 'd':
        const position = camera.position.clone();
        updateCamera();
        camera.position.copy(position);
        camera.lookAt(0, 0, 0);
        TRANSFORM.controls.camera = camera;
        break;
      case 'f':
        camera.lookAt(TRANSFORM.controls.object.position);
        ORBIT.controls.target.set(TRANSFORM.controls.object.position.x, TRANSFORM.controls.object.position.y, TRANSFORM.controls.object.position.z);
        break;
      case 'z':
        TRANSFORM.controls.showZ = !TRANSFORM.controls.showZ;
        break;
      case 'x':
        TRANSFORM.controls.showX = !TRANSFORM.controls.showX;
        break;
      case 'c':
        TRANSFORM.controls.showY = !TRANSFORM.controls.showY;
        break;
      case 'v':
        TRANSFORM.controls.enabled = !TRANSFORM.controls.enabled;
        break;
      case '-':
      case '_':
        if (camera === perspective) {
          if (camera.fov > 100) {
            camera.fov = 100;
          } else {
            camera.fov += 1;
          }
        } else {
          camera.zoom -= 0.01;
        }
        camera.updateProjectionMatrix();
        break;
      case '+':
      case '=':
        if (camera === perspective) {
          if (camera.fov < 20) {
            camera.fov = 20;
          } else {
            camera.fov -= 1;
          }
        } else {
          camera.zoom += 0.02;
        }
        camera.updateProjectionMatrix();
        break;
      case 'Shift':
        TRANSFORM.controls.setTranslationSnap(0.5);
        TRANSFORM.controls.setRotationSnap(THREE.MathUtils.degToRad(15));
        TRANSFORM.controls.setScaleSnap(0.5);
        break;
      case 'Escape':
        if (TRANSFORM.controls.object.isMesh) {
          deleteOutline();
        }
        TRANSFORM.controls.detach();
        break;
      case 'Delete':
        TRANSFORM.deleteAttachedObject();
        // TRANSFORM.controls.detach();
        break;
    }
  }
});

document.addEventListener('keyup', event => {
  switch (event.key) {
    case 'Shift':
      TRANSFORM.controls.setTranslationSnap(null);
      TRANSFORM.controls.setRotationSnap(null);
      TRANSFORM.controls.setScaleSnap(null);
      break;
  }
});
