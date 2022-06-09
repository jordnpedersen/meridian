'use strict';

import * as THREE from 'three';
import {scene, camera} from '/src/main.js';
import * as TRANSFORM from '/src/controls/transform.js';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

/**
 * Calculate pointer position in normalized device coordinates
 * (-1 to +1) for both components
 * @param {event} event
 */
function onMouseMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

/**
 * Do something when mouse pressed over mesh
 * @param {event} event
 */
function onMouseDown(event) {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    let selectedObject = intersects[i].object;
    if (selectedObject.type == "Mesh" && (pointer.x != 0 && pointer.y != 0) && selectedObject.static != true) {
      selectedObject.material.color.set(0x00ff00);
      TRANSFORM.controls.attach(selectedObject);
    }
  }
}

/**
 * Update the picking ray with the camera and pointer position
 * Calculate objects intersecting the picking ray
 */
function raycast() {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.type == "Mesh" && (pointer.x != 0 && pointer.y != 0)) {
      // TODO: This currently does not do anything. See if we need a case where an object will change upon mouse over.
      // intersects[i].object.material.color.set(0xff0000);
    }
  }
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mousedown', onMouseDown, false);

export {raycast};
