'use strict';

import * as OBJECT from '/src/utils/object.js';

const ul = document.getElementById("addObjects");
const lis = ul.getElementsByTagName("li");

// Add event listeners for 'add object' for all objects
for (let child of lis) {
  let childID = document.getElementById(child.children.item(0).id);
  childID.addEventListener("click", () => {OBJECT.addObject(child.children.item(0).outerText)}, false);
}
