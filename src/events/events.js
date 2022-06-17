'use strict';

import * as OBJECT from '/src/utils/object.js';

const ul = document.getElementById('addObjects');
const li = ul.getElementsByTagName('li');

// Add event listeners for 'add object' for all objects
for (let child of li) {
  let childID = document.getElementById(child.children.item(0).id);

  childID.addEventListener('click', () => {
    OBJECT.addObject(child.children.item(0).outerText);
  });
}
