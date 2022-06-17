'use strict';

import * as THREE from 'three';

const material = new THREE.MeshNormalMaterial({
  dithering: true,
  opacity: 1,
  transparent: false
});

export {material};
