'use strict';

import {undos, undoAdd, undoDelete, undoTransformp, undoTransformr, undoTransforms} from '/src/history/undo.js';
import {redos, redoAdd, redoDelete, redoTransformp, redoTransformr, redoTransforms} from '/src/history/redo.js';

/**
 * Clears the history by setting both undos and redos stacks to empty
 */
function clear() {
  undos.length = 0;
  redos.length = 0;
}

/**
 * Adds a command to undos stack
 * @param {Object} cmd command object to add to undos stack (see /history/command.js)
 */
function add(cmd) {
  undos.push(cmd);
  console.log('undos[]', undos);

  if (redos && redos.length) {
    if (cmd.creationTime.getTime() > redos[redos.length - 1].undoTime.getTime()) {
      redos.length = 0; // clear redos array
    }
  }
}

/**
 * Pops the last command off the redos stack, adds it to undos stack, and executes it
 * @returns undefined if redos stack does not exist or is empty
 */
function redo() {
  if (redos === undefined || redos.length === 0) {
    return;
  }

  const cmd = redos.pop();
  delete cmd.undoTime;
  undos.push(cmd);

  switch (cmd.action) {
    case 'add':
      redoAdd(cmd);
      break;
    case 'delete':
      redoDelete(cmd);
      break;
    case 'rename':
      redoRename(cmd);
      break;
    case 'transformp':
      redoTransformp(cmd);
      break;
    case 'transformr':
      redoTransformr(cmd);
      break;
    case 'transforms':
      redoTransforms(cmd);
      break;
  }
}

/**
 * Pops the last command off the undos stack, adds it to redos stack, and executes it
 * @returns undefined if undos stack does not exist or is empty
 */
function undo() {
  if (undos === undefined || undos.length === 0) {
    return;
  }

  console.log('undo() called, before pop:', undos);

  const cmd = undos.pop();
  cmd.undoTime = new Date();
  redos.push(cmd);

  console.log('undo() called, after pop: ', undos);

  switch (cmd.action) {
    case 'add':
      undoAdd(cmd);
      break;
    case 'delete':
      undoDelete(cmd);
      break;
    case 'rename':
      undoRename(cmd);
      break;
    case 'transformp':
      undoTransformp(cmd);
      break;
    case 'transformr':
      undoTransformr(cmd);
      break;
    case 'transforms':
      undoTransforms(cmd);
      break;
  }

}

export {clear, add, undo, redo};
