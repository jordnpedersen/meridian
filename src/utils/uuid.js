'use strict';

/**
 * Replaces an object's ID in the HTML (currently unused)
 * @param {THREE.Object3D} object object to replace ID of in HTML
 * @param {string} objectId objectId already embedded in HTML
 */
function replaceID(object, objectId) {
  document.getElementById(objectId).setAttribute("id", object.uuid);
}

/**
 * Embeds a THREE.Object3D's uuid to the corresponding <li> in the scene
 * @param {THREE.Object3D} object object to embed ID into HTML
 */
function assignID(object) {
  const ul = document.getElementById("sceneObjects");
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.innerHTML = object.name;
  button.setAttribute("id", object.id);
  li.appendChild(button);
  ul.appendChild(li);
}

export {replaceID, assignID};
