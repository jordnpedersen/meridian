'use strict';

import * as THREE from 'three';

const COLOR = 0x181818;
const OUTLINE_COLOR = 0x282828;
const OPACITY = 1;
const DITHERING = true;
const TRANSPARENT = false;

const MATERIALS = {
  'basic': new THREE.MeshBasicMaterial({
    color: COLOR,
    opacity: OPACITY,
    transparent: TRANSPARENT
  }),
  'lambert': new THREE.MeshLambertMaterial({
    color: COLOR,
    dithering: DITHERING,
    opacity: OPACITY,
    transparent: TRANSPARENT
  }),
  'normal': new THREE.MeshNormalMaterial({
    dithering: DITHERING,
    opacity: OPACITY,
    transparent: TRANSPARENT
  }),
  'outline': new THREE.MeshBasicMaterial({
    color: OUTLINE_COLOR,
    side: THREE.BackSide
  }),
  'phong': new THREE.MeshPhongMaterial({
    color: COLOR,
    dithering: DITHERING,
    opacity: OPACITY,
    shininess: 30,
    transparent: TRANSPARENT
  }),
  'standard': new THREE.MeshStandardMaterial({
    color: COLOR,
    dithering: DITHERING,
    metalness: 0,
    opacity: OPACITY,
    roughness: 0.7,
    transparent: TRANSPARENT
  })
}

export {MATERIALS};
