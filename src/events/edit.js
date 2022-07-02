'use strict';

import * as HISTORY from '/src/history/history.js';
import UI from '/src/configs/ui.js'

UI.undo.addEventListener('click', event => {
  HISTORY.undo();
});

UI.redo.addEventListener('click', event => {
  HISTORY.redo();
});
