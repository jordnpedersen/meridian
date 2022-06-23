'use strict';

import * as THREE from 'three';

const OBJECTS = {
  'capsule': {
    'geometry': new THREE.CapsuleGeometry(0.5, 1, 8, 16)
  },
  'cone': {
    'geometry': new THREE.ConeGeometry(0.5, 1, 32, 4)
  },
  'cube': {
    'geometry': new THREE.BoxGeometry(1, 1, 1)
  },
  'cylinder': {
    'geometry': new THREE.CylinderGeometry(0.5, 0.5, 1, 32)
  },
  'knot': {
    'geometry': new THREE.TorusKnotGeometry(0.3, 0.1, 96, 16)
  },
  'sphere': {
    'geometry': new THREE.SphereGeometry(0.5, 32, 32)
  },
  'torus': {
    'geometry': new THREE.TorusGeometry(0.4, 0.2, 16, 64)
  }
}

export {OBJECTS};
