'use strict';

import * as OBJECT from '/src/utils/object.js';
import * as POINT from '/src/lights/point.js';
import * as SPOT from '/src/lights/spot.js';
import {ui} from '/src/configs/ui.js'

const obj_li = ui.addSection.objects.getElementsByTagName('li');
const light_li = ui.addSection.lights.getElementsByTagName('li');

// Add event listeners for 'add object' for all objects
for (let child of obj_li) {
  let childID = document.getElementById(child.children.item(0).id);

  childID.addEventListener('click', () => {
    OBJECT.addObject(child.children.item(0).outerText);
  });
}

// Add event listeners for 'add object' for all objects
for (let child of light_li) {
  let childID = document.getElementById(child.children.item(0).id);

  childID.addEventListener('click', () => {
    switch (child.children.item(0).outerText) {
      case 'point':
        POINT.addLight();
        break;
      case 'spot':
        SPOT.addLight();
        break;
    }
  });
}
