'use strict';

import * as THREE from 'three';

/**
 * Sets the type of a 3D object to be used in it's command property
 * @param {THREE.Object3D} obj 3D object to get type of
 * @returns 'object' if mesh, 'light' if light
 */
function getType(obj) {
  if (!obj.isLight) {
    return 'object';
  } else {
    return 'light';
  }
}

/**
 * Creates and returns a command object to be used by history and stored in undos / redos stack
 * @param {String} type the type of object (should either be 'object' or 'light')
 * @param {THREE.Object3D} object 3D object to store
 * @returns command object
 */
function createCommand(type, object) {
  switch (type) {
    case 'add':
      return {
        'action': 'add',
        'creationTime': new Date(),
        'object': {
          'name': object.geometry.name,
          'sceneName': object.name,
          'type': getType(object),
          'id': object.id
        }
      }
    case 'delete':
      return {
        'action': 'delete',
        'creationTime': new Date(),
        'object': object,
        'id': object.id
      }
    case 'transformp':
      return {
        'action': 'transformp',
        'creationTime': new Date(),
        'object': {
          'oldPosition': new THREE.Vector3(object.lastPosition.x, object.lastPosition.y, object.lastPosition.z),
          'newPosition': new THREE.Vector3(object.position.x, object.position.y, object.position.z),
          'id': object.id
        }
      }
    case 'transformr':
      return {
        'action': 'transformr',
        'creationTime': new Date(),
        'object': {
          'oldRotation': new THREE.Euler(object.lastRotation.x, object.lastRotation.y, object.lastRotation.z),
          'newRotation': new THREE.Euler(object.rotation.x, object.rotation.y, object.rotation.z),
          'id': object.id
        }
      }
    case 'transforms':
      return {
        'action': 'transforms',
        'creationTime': new Date(),
        'object': {
          'oldScale': new THREE.Vector3(object.lastScale.x, object.lastScale.y, object.lastScale.z),
          'newScale': new THREE.Vector3(object.scale.x, object.scale.y, object.scale.z),
          'id': object.id
        }
      }
  }
}

export {createCommand};
