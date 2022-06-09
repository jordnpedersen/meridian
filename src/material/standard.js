'use strict';

import * as THREE from 'three';

const material = new THREE.MeshStandardMaterial({
  color: 0x111111,
  dithering: true,
  metalness: 1,
  opacity: 1,
  roughness: 0.5,
  transparent: true
});

export {material};
