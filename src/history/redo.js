'use strict';

import {scene} from '/src/main.js';
import {raycasterObjects, addObject, deleteObject} from '/src/utils/object.js';
import {lastPosition, lastRotation, lastScale} from '/src/events/controls.js';
import {transformRender} from '/src/controls/transform.js';

const redos = []; // stack

/**
 * Executes a redo for an object scale transformation
 * @param {Object} cmd command object to parse (see /history/command.js)
 */
function redoTransforms(cmd) {
  const obj = scene.getObjectById(cmd.object.id);
  obj.scale.copy(cmd.object.newScale);
  lastScale.copy(cmd.object.newScale);
  obj.updateMatrix();
  transformRender();
}

/**
 * Executes a redo for an object rotation transformation
 * @param {Object} cmd command object to parse (see /history/command.js)
 */
function redoTransformr(cmd) {
  const obj = scene.getObjectById(cmd.object.id);
  obj.rotation.copy(cmd.object.newRotation);
  lastRotation.copy(cmd.object.newRotation);
  obj.updateMatrix();
  transformRender();
}

/**
 * Executes a redo for an object position transformation
 * @param {Object} cmd command object to parse (see /history/command.js)
 */
function redoTransformp(cmd) {
  const obj = scene.getObjectById(cmd.object.id);
  obj.position.copy(cmd.object.newPosition);
  lastPosition.copy(cmd.object.newPosition);
  obj.updateMatrix();
  transformRender();
}

/**
 * Executes a redo for an object delete
 * @param {Object} cmd command object to parse (see /history/command.js)
 */
function redoDelete(cmd) {
  deleteObject(cmd.object);
}

/**
 * Executes a redo for an object add
 * @param {Object} cmd command object to parse (see /history/command.js)
 */
function redoAdd(cmd) {
  switch (cmd.object.type) {

    case 'object':
      addObject(cmd.object.name, true, {'name': cmd.object.sceneName, 'id': cmd.object.id});
      break;

    case 'light':
      switch (cmd.object.name) {
        case 'pointLight':
          console.log('undoAdd:pointLight');
          break;
        case 'spotLight':
          console.log('undoAdd:spotLight');
          break;
      }
      break;

  }
}

export {redos, redoAdd, redoDelete, redoTransformp, redoTransformr, redoTransforms};
