'use strict';

import * as TRANSFORM from '/src/controls/transform.js';
import {scene} from '/src/main.js';
import {raycasterObjects, addObject, deleteObject} from '/src/utils/object.js';
import {lastPosition, lastRotation, lastScale} from '/src/events/controls.js';
import {transformRender} from '/src/controls/transform.js';
import {assignID} from '/src/utils/uuid.js';

const undos = []; // stack

/**
 * Executes an undo for an object scale transformation
 * @param {Object} cmd command object to parse (see /history/command.js)
 */
function undoTransforms(cmd) {
  const obj = scene.getObjectById(cmd.object.id);
  obj.scale.copy(cmd.object.oldScale);
  lastScale.copy(cmd.object.oldScale);
  obj.updateMatrix();
  transformRender();
}

/**
 * Executes an undo for an object rotation transformation
 * @param {Object} cmd command object to parse (see /history/command.js)
 */
function undoTransformr(cmd) {
  const obj = scene.getObjectById(cmd.object.id);
  obj.rotation.copy(cmd.object.oldRotation);
  lastRotation.copy(cmd.object.oldRotation);
  obj.updateMatrix();
  transformRender();
}

/**
 * Executes an undo for an object position transformation
 * @param {Object} cmd command object to parse (see /history/command.js)
 */
function undoTransformp(cmd) {
  const obj = scene.getObjectById(cmd.object.id);
  obj.position.copy(cmd.object.oldPosition);
  lastPosition.copy(cmd.object.oldPosition);
  obj.updateMatrix();
  transformRender();
}

/**
 * Executes an undo for an object delete
 * @param {Object} cmd command object to parse (see /history/command.js)
 */
function undoDelete(cmd) {
  scene.add(cmd.object);
  assignID(cmd.object);
  raycasterObjects.push(cmd.object);
}

/**
 * Executes an undo for an object add
 * @param {Object} cmd command object to parse (see /history/command.js)
 */
function undoAdd(cmd) {
  console.log('cmd.object.type', cmd.object);
  switch (cmd.object.type) {

    case 'object':
      const object = scene.getObjectById(cmd.object.id);
      // TODO: Should probably just make it so that deleteObject() handles the check if object is attached or not
      if (object === TRANSFORM.controls.object) {
        TRANSFORM.deleteAttachedObject(true);
      } else {
        deleteObject(object, true);
      }
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

export {undos, undoAdd, undoDelete, undoTransformp, undoTransformr, undoTransforms};
