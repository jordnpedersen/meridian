'use strict';

import * as THREE from 'three';

const material = new THREE.MeshStandardMaterial({
  color: 0x080808,
  dithering: true,
  metalness: 0,
  opacity: 1,
  roughness: 0.5,
  transparent: true
});

export {material};
