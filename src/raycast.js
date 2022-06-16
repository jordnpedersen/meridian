'use strict';

import * as THREE from 'three';
import * as TRANSFORM from '/src/controls/transform.js';
import {scene, camera} from '/src/main.js';
import {ui} from '/src/configs/ui.js';
import {raycasterObjects} from '/src/utils/object.js';

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

/**
 * Calculate pointer position in normalized device coordinates
 * (-1 to +1) for both components
 * @param {event} event
 */
window.addEventListener('mousemove', event => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

/**
 * Checks to see if event pressed is the 'scene' UI element
 * @param {event} event
 * @returns true if scene section is in event's path array
 */
function clickedUI(event) {
  for (let i = 0; i < event.path.length; i++) {
    if (event.path[i] === ui.add || event.path[i] === ui.scene) {
      return true;
    }
  }

  return false;
}

/**
 * Do something when mouse is pressed over mesh
 * @param {event} event
 */
window.addEventListener('mousedown', event => {
  const intersects = raycaster.intersectObjects(raycasterObjects);
  const filtered = intersects.filter(e => e.object.static === true && e.object.type !== 'Mesh');

  raycaster.setFromCamera(pointer, camera);

  for (let i = 0; i < intersects.length; i++) {
    let selectedObject = intersects[i].object;

    if (selectedObject.type === 'Mesh' && (pointer.x !== 0 && pointer.y !== 0) && selectedObject.static !== true) {
      TRANSFORM.controls.attach(selectedObject);
      break;
    }
  }

  if (intersects.length === 0 || filtered.length === intersects.length) {
    if (!clickedUI(event)) {
      const selectedObject = TRANSFORM.controls.object;

      TRANSFORM.controls.detach();
    }
  }
});

/**
 * Update the picking ray with the camera and pointer position
 * Calculate objects intersecting the picking ray
 */
function raycast() {
  const intersects = raycaster.intersectObjects(scene.children);

  raycaster.setFromCamera(pointer, camera);

  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.type === 'Mesh' && (pointer.x !== 0 && pointer.y !== 0)) {
      // TODO: See if we need a case where an object will change upon mouse over
      // intersects[i].object.material.color.set(0xff0000);
    }
  }
}

export {raycast};
