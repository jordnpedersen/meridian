import * as THREE from 'three';

const scale = {x: 1, y: 1, z: 1};

const material = new THREE.MeshStandardMaterial({
  color: 0x111111,
  dithering: true,
  metalness: 1,
  opacity: 1,
  roughness: 0.5,
  transparent: true
});

export {scale, material};
