'use strict';

import * as TRANSFORM from '/src/controls/transform.js';
import {scene} from '/src/main.js';

const px = document.getElementById('position-x');
const py = document.getElementById('position-y');
const pz = document.getElementById('position-z');

const rx = document.getElementById('rotation-x');
const ry = document.getElementById('rotation-y');
const rz = document.getElementById('rotation-z');

const sx = document.getElementById('scale-x');
const sy = document.getElementById('scale-y');
const sz = document.getElementById('scale-z');

function updateUIposition(x, y, z) {
  px.value = x;
  py.value = y;
  pz.value = z;
}

function updateUIrotation(x, y, z) {
  rx.value = x;
  ry.value = y;
  rz.value = z;
}

function updateUIscale(x, y, z) {
  sx.value = x;
  sy.value = y;
  sz.value = z;
}

function updateUI() {
  if (TRANSFORM.controls.object === undefined) {
    updateUIposition(0, 0, 0);
    updateUIrotation(0, 0, 0);
    updateUIscale(0, 0, 0);
  } else {
    updateUIposition(TRANSFORM.controls.object.position.x, TRANSFORM.controls.object.position.y, TRANSFORM.controls.object.position.z);
    updateUIrotation(TRANSFORM.controls.object.rotation.x, TRANSFORM.controls.object.rotation.y, TRANSFORM.controls.object.rotation.z);
    updateUIscale(TRANSFORM.controls.object.scale.x, TRANSFORM.controls.object.scale.y, TRANSFORM.controls.object.scale.z);
  }
}

document.getElementById('sceneObjects').addEventListener('click', event => {
  const object = scene.getObjectById(parseInt(event.target.id));

  if (object !== undefined) {
    TRANSFORM.controls.attach(object);
  }
});

export {updateUI};
