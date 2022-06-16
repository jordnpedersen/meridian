'use strict';

import * as THREE from 'three';

const material = new THREE.MeshLambertMaterial({
  color: 0x111111,
  dithering: true,
  opacity: 1,
  transparent: true
});

export {material};
