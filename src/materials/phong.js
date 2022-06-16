'use strict';

import * as THREE from 'three';

const material = new THREE.MeshPhongMaterial({
  color: 0x111111,
  dithering: true,
  opacity: 1,
  shininess: 30,
  transparent: true
});

export {material};
