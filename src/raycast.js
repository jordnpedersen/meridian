'use strict';

import * as THREE from 'three';
import {scene, camera} from '/src/main.js';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

/**
 * Calculate pointer position in normalized device coordinates
 * (-1 to +1) for both components
 * @param {event} event
 */
function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
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
      // TODO: Implement / call relevant logic necessary for mesh
      intersects[i].object.material.color.set(0xff0000);
    }
  }
}

window.addEventListener('pointermove', onPointerMove);

export {raycast};
