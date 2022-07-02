'use strict';

import * as THREE from 'three';
import * as HISTORY from '/src/history/history.js';
import {createCommand} from '/src/history/command.js';

let lastPosition = new THREE.Vector3(0, 0, 0);
let lastRotation = new THREE.Euler(0, 0, 0);
let lastScale = new THREE.Vector3(1, 1, 1);

/**
 * Updates properties for object's last scale transformation
 * @param {THREE.Object3D} controls TransformControls object
 */
function updateLastScale(controls) {
  if (controls.object.scale.equals(lastScale)) {
    // same as last position
  } else {
    // different from last position
    if (controls.object.lastScale === undefined) {
      controls.object.lastScale = new THREE.Vector3(lastScale.x, lastScale.y, lastScale.z);
    } else {
      controls.object.lastScale.copy(lastScale);
    }
    HISTORY.add(createCommand('transforms', controls.object));
    lastScale.copy(controls.object.scale);
  }
}

/**
 * Updates properties for object's last rotation transformation
 * @param {THREE.Object3D} controls TransformControls object
 */
function updateLastRotation(controls) {
  if (controls.object.rotation.equals(lastRotation)) {
    // same as last position
  } else {
    // different from last position
    if (controls.object.lastRotation === undefined) {
      controls.object.lastRotation = new THREE.Euler(lastRotation.x, lastRotation.y, lastRotation.z);
    } else {
      controls.object.lastRotation.copy(lastRotation);
    }
    HISTORY.add(createCommand('transformr', controls.object));
    lastRotation.copy(controls.object.rotation);
  }
}

/**
 * Updates properties for object's last position transformation
 * @param {THREE.Object3D} controls TransformControls object
 */
function updateLastPosition(controls) {
  if (controls.object.position.equals(lastPosition)) {
    // same as last position
  } else {
    // different from last position
    if (controls.object.lastPosition === undefined) {
      controls.object.lastPosition = new THREE.Vector3(0, 0, 0);
    } else {
      controls.object.lastPosition.copy(lastPosition);
    }
    HISTORY.add(createCommand('transformp', controls.object));
    lastPosition.copy(controls.object.position);
  }
}

/**
 * Sets an event listener for controls on mouse up
 * Records their last transformations for undos / redos commands
 * @param {THREE.Object3D} controls TransformControls object
 */
function createMouseUpEvent(controls) {
  controls.addEventListener('mouseUp', event => {
    updateLastPosition(controls);
    updateLastRotation(controls);
    updateLastScale(controls);
  })
}

export {lastPosition, lastRotation, lastScale, createMouseUpEvent};
