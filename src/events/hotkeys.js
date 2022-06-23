'use strict';

import * as THREE from 'three';
import * as ORBIT from '/src/controls/orbit.js';
import {scene, camera, perspective, updateCamera} from '/src/main.js';
import {raycasterObjects} from '/src/utils/object.js';
import {deleteOutline} from '/src/utils/outline.js';
import {deleteObject} from '/src/utils/object.js';

/**
 * Event listener for transform shortcuts
 */
document.addEventListener('keydown', event => {
  if (controls.object !== undefined) {
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
      case 'a':
        controls.setSize(controls.size + 0.1);
        break;
      case 's':
        controls.setSize(Math.max(controls.size - 0.1, 0.1));
        break;
      case 'd':
        const position = camera.position.clone();
        updateCamera();
        camera.position.copy(position);
        camera.lookAt(0, 0, 0);
        controls.camera = camera;
        break;
      case 'f':
        camera.lookAt(controls.object.position);
        ORBIT.controls.target.set(controls.object.position.x, controls.object.position.y, controls.object.position.z);
        break;
      case 'z':
        controls.showZ = !controls.showZ;
        break;
      case 'x':
        controls.showX = !controls.showX;
        break;
      case 'c':
        controls.showY = !controls.showY;
        break;
      case 'v':
        controls.enabled = !controls.enabled;
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
        controls.setTranslationSnap(0.5);
        controls.setRotationSnap(THREE.MathUtils.degToRad(15));
        controls.setScaleSnap(0.5);
        break;
      case 'Escape':
        if (controls.object.isMesh) {
          deleteOutline();
        }
        controls.detach();
        break;
      case 'Delete':
        if (controls.object.isMesh) {
          deleteOutline();
        }
        if (controls.object.isLight) {
          const lightHelper = scene.getObjectByName(controls.object.uuid);
          raycasterObjects.splice(raycasterObjects.findIndex(obj => obj.uuid === lightHelper.uuid), 1);
        } else {
          raycasterObjects.splice(raycasterObjects.findIndex(obj => obj.uuid === controls.object.uuid), 1);
        }
        deleteObject(controls.object);
        controls.detach();
        break;
    }
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
