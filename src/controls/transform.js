'use strict';

import * as THREE from 'three';
import * as ORBIT from '/src/controls/orbit.js';
import {TransformControls} from 'TransformControls';
import {scene, camera, renderer, render, updateCamera} from '/src/main.js';
import {raycasterObjects} from '/src/utils/object.js';
import {createOutline, deleteOutline, outlineExists} from '/src/utils/outline.js';
import {deleteObject} from '/src/utils/object.js';

let controls;

/**
 * Create transform controller
 */
function createController() {
  controls = new TransformControls(camera, renderer.domElement);
  controls.setSize(0.9);
  controls.addEventListener('change', render);
  controls.addEventListener('dragging-changed', event => {
    ORBIT.controls.enabled = !event.value;
  });

  // Set a custom property 'static' to let raycaster know to not select transform controller mesh
  // TODO: See if it would be better to create a new method outside that handles this for any object
  controls.static = true;
  controls.traverse(child => child.static = true);
  scene.add(controls);

  raycasterObjects.push(controls);
}

/**
 * Selects an object via controls and enables it's outline
 * @param {THREE.Object3D} object object to attach and apply outline to
 * @returns
 */
function outlineAttach(object) {
  if (object === undefined) {
    return;
  }
  if (controls.object !== object) {
    outlineDetach(controls.object);
  }
  createOutline(object);
  controls.attach(object);
}

/**
 * Detaches from an object via controls and disables it's outline
 * @param {THREE.Object3D} object object to detach from and remove outline from
 * @returns
 */
function outlineDetach(object) {
  if (object === undefined) {
    return;
  }
  if (outlineExists()) {
    deleteOutline();
  }
  controls.detach(object);
}

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
      case 'x':
        controls.showX = !controls.showX;
        break;
      case 'y':
        controls.showY = !controls.showY;
        break;
      case 'z':
        controls.showZ = !controls.showZ;
        break;
      case 'a':
        controls.setSize(controls.size + 0.1);
        break;
      case 's':
        controls.setSize(Math.max(controls.size - 0.1, 0.1));
        break;
      case 'd':
        const position = camera.position.clone();
        updateCamera('perspective');
        camera.position.copy(position);
        controls.camera = camera;
        camera.updateProjectionMatrix();
        break;
      case '-':
      case '_':
        if (camera.fov > 120) {
          camera.fov = 120;
        } else {
          camera.fov += 1;
        }
        camera.updateProjectionMatrix();
        break;
      case '=':
      case '+':
        if (camera.fov < 20) {
          camera.fov = 20;
        } else {
          camera.fov -= 1;
        }
        camera.updateProjectionMatrix();
        break;
      case ' ':
        controls.enabled = !controls.enabled;
        break;
      case 'Shift':
        controls.setTranslationSnap(0.5);
        controls.setRotationSnap(THREE.MathUtils.degToRad(15));
        controls.setScaleSnap(0.5);
        break;
      case 'Escape':
        deleteOutline();
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

export {controls, createController, outlineAttach, outlineDetach};
