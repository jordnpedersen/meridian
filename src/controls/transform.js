'use strict';

import * as THREE from 'three';
import * as ORBIT from '/src/controls/orbit.js';
import {TransformControls} from 'TransformControls';
import {scene, camera, renderer, render} from '/src/main.js';
import {raycasterObjects} from '/src/utils/object.js';
import {createOutline, deleteOutline, outlineExists, setOutline} from '/src/utils/outline.js';
import {deleteObject} from '/src/utils/object.js';
import {updateUI} from '/src/utils/ui.js';
import {createMouseUpEvent} from '/src/events/controls.js';

let controls;

/**
 * Create transform controller
 */
function createController() {
  controls = new TransformControls(camera, renderer.domElement);
  controls.setSize(0.9);
  controls.addEventListener('change', transformRender);
  controls.addEventListener('dragging-changed', event => {
    ORBIT.controls.enabled = !event.value;
  });

  createMouseUpEvent(controls);

  // Set a custom property 'static' to let raycaster know to not select transform controller mesh
  // TODO: See if it would be better to create a new method outside that handles this for any object
  controls.static = true;
  controls.traverse(child => child.static = true);
  scene.add(controls);

  raycasterObjects.push(controls);
}

/**
 * Renders the transform controls changes
 * TODO: Perhaps we should move this function to a new file e.g. /utils/render.js
 *       as we may have other render functions in the future
 */
function transformRender() {
  setOutline();
  updateUI();
  render();
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
 * Deletes the currently attached object and object outline
 */
function deleteAttachedObject(isCmd = false) {
  deleteObject(controls.object, isCmd);
  controls.detach();
}

export {controls, createController, outlineAttach, outlineDetach, deleteAttachedObject, transformRender};
