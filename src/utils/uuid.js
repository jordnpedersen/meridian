'use strict';

import UI from '/src/configs/ui.js';

/**
 * Replaces an object's ID in the HTML (currently unused)
 * @param {THREE.Object3D} object object to replace ID of in HTML
 * @param {string} objectId objectId already embedded in HTML
 */
function replaceID(object, objectId) {
  document.getElementById(objectId).setAttribute('id', object.uuid);
}

/**
 * Embeds a THREE.Object3D's UUID to the corresponding <li> in the scene
 * @param {THREE.Object3D} object object to embed ID into HTML
 */
function assignID(object) {
  const li = document.createElement('li');
  const button = document.createElement('button');

  button.innerHTML = object.name;
  button.setAttribute('id', object.id);
  UI.sceneObjects.appendChild(li);
  li.appendChild(button);
}

export {replaceID, assignID};
