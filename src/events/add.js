'use strict';

import * as OBJECT from '/src/utils/object.js';
import * as POINT from '/src/lights/point.js';
import * as SPOT from '/src/lights/spot.js';
import UI from '/src/configs/ui.js'

const obj_li = UI.addObject.getElementsByTagName('li');
const light_li = UI.addLight.getElementsByTagName('li');

// Add event listeners for 'add object' for all objects
for (let child of obj_li) {
  let childID = document.getElementById(child.children.item(0).id);

  childID.addEventListener('click', () => {
    OBJECT.addObject(child.children.item(0).outerText);
  });
}

// Add event listeners for 'add light' for all lights
for (let child of light_li) {
  let childID = document.getElementById(child.children.item(0).id);

  childID.addEventListener('click', () => {
    switch (child.children.item(0).outerText) {
      case 'point':
        POINT.addLight(true, [0, 3, 0], ui.color.value);
        break;
      case 'spot':
        SPOT.addLight(true, [0, 3, 0], ui.color.value);
        break;
    }
  });
}
