'use strict';

import * as THREE from 'three';

const material = new THREE.MeshLambertMaterial({
  color: 0x181818,
  dithering: true,
  opacity: 1,
  transparent: true
});

export {material};
