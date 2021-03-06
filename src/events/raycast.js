'use strict';

import * as THREE from 'three';
import * as TRANSFORM from '/src/controls/transform.js';
import {camera} from '/src/main.js';
import {clickedUI} from '/src/utils/ui.js';
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
 * Do something when mouse is pressed over mesh
 * @param {event} event
 */
window.addEventListener('mousedown', event => {
  if (clickedUI(event)) {
    return;
  }

  const intersects = raycaster.intersectObjects(raycasterObjects);
  const filtered = intersects.filter(e => e.object.static === true && e.object.type !== 'Mesh');

  raycaster.setFromCamera(pointer, camera);

  for (let i = 0; i < intersects.length; i++) {
    let selectedObject = intersects[i].object;

    if ((selectedObject.isMesh || selectedObject.isLine) && (pointer.x !== 0 && pointer.y !== 0)) {
      if (TRANSFORM.controls.dragging) {
        return;
      }
      if (selectedObject.static !== true) {
        if (selectedObject.isHelper) {
          TRANSFORM.outlineAttach(selectedObject.light);
        } else if (selectedObject.isLine) {
          TRANSFORM.outlineAttach(selectedObject.parent.light);
        } else {
          TRANSFORM.outlineAttach(selectedObject);
        }
        break;
      }
    }
  }

  if (intersects.length === 0 || filtered.length === intersects.length) {
    if (!clickedUI(event)) {
      TRANSFORM.outlineDetach(TRANSFORM.controls.object);
    }
  }
});

/**
 * Update the picking ray with the camera and pointer position
 * Calculate objects intersecting the picking ray
 */
function raycast() {
  raycaster.setFromCamera(pointer, camera);
}

export {raycast};
