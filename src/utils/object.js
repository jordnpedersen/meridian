'use strict';

import * as THREE from 'three';
import * as STANDARD from '/src/materials/standard.js';
import * as TRANSFORM from '/src/controls/transform.js';
import * as ID from '/src/utils/uuid.js';
import * as NAME from '/src/utils/name.js';
import {scene} from '/src/main.js';
import {objects} from '/src/configs/objects.js';

const raycasterObjects = [];

/**
 * Adds an object (mesh) to the scene, and assigns it's UUID embedded in the HTML
 * @param {string} objectName object name to add to scene
 * @param {boolean} attach true if transform controls should automatically be attached to object
 */
function addObject(objectName, attach = true) {
  const object = new THREE.Mesh(objects[objectName].geometry, STANDARD.material);
  object.name = NAME.getName(objectName);
  raycasterObjects.push(object);
  scene.add(object);

  ID.assignID(object);

  if (attach) {
    TRANSFORM.controls.attach(object);
  }
}

export {addObject, raycasterObjects};
