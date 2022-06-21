'use strict';

import * as THREE from 'three';
import * as TRANSFORM from '/src/controls/transform.js';
import * as BASIC from '/src/materials/basic.js';
import * as LAMBERT from '/src/materials/lambert.js';
import * as NORMAL from '/src/materials/normal.js';
import * as PHONG from '/src/materials/phong.js';
import * as STANDARD from '/src/materials/standard.js';
import UI from '/src/configs/ui.js';
import {scene, camera} from '/src/main.js';

// --- OBJECT ---

// POSITION

UI.position.x.addEventListener('blur', event => {
  if (TRANSFORM.controls.object !== undefined) {
    TRANSFORM.controls.object.position.x = parseFloat(UI.position.x.value);
  }
});

UI.position.y.addEventListener('blur', event => {
  if (TRANSFORM.controls.object !== undefined) {
    TRANSFORM.controls.object.position.y = parseFloat(UI.position.y.value);
  }
});

UI.position.z.addEventListener('blur', event => {
  if (TRANSFORM.controls.object !== undefined) {
    TRANSFORM.controls.object.position.z = parseFloat(UI.position.z.value);
  }
});

// ROTATION

UI.rotation.x.addEventListener('blur', event => {
  if (TRANSFORM.controls.object !== undefined) {
    TRANSFORM.controls.object.rotation.x = parseFloat(UI.rotation.x.value);
  }
});

UI.rotation.y.addEventListener('blur', event => {
  if (TRANSFORM.controls.object !== undefined) {
    TRANSFORM.controls.object.position.y = parseFloat(UI.rotation.y.value);
  }
});

UI.rotation.z.addEventListener('blur', event => {
  if (TRANSFORM.controls.object !== undefined) {
    TRANSFORM.controls.object.rotation.z = parseFloat(UI.rotation.z.value);
  }
});

// SCALE

UI.scale.x.addEventListener('blur', event => {
  if (TRANSFORM.controls.object !== undefined) {
    TRANSFORM.controls.object.scale.x = parseFloat(UI.scale.x.value);
  }
});

UI.scale.y.addEventListener('blur', event => {
  if (TRANSFORM.controls.object !== undefined) {
    TRANSFORM.controls.object.scale.y = parseFloat(UI.scale.y.value);
  }
});

UI.scale.z.addEventListener('blur', event => {
  if (TRANSFORM.controls.object !== undefined) {
    TRANSFORM.controls.object.scale.z = parseFloat(UI.scale.z.value);
  }
});

// --- MATERIAL ---

// BASIC

UI.basic.addEventListener('click', event => {
  if (TRANSFORM.controls.object.isMesh) {
    TRANSFORM.controls.object.material = BASIC.material;
  }
});

// LAMBERT

UI.lambert.addEventListener('click', event => {
  if (TRANSFORM.controls.object.isMesh) {
    TRANSFORM.controls.object.material = LAMBERT.material;
  }
});

// NORMAL

UI.normal.addEventListener('click', event => {
  if (TRANSFORM.controls.object.isMesh) {
    TRANSFORM.controls.object.material = NORMAL.material;
  }
});

// PHONG

UI.phong.addEventListener('click', event => {
  if (TRANSFORM.controls.object.isMesh) {
    TRANSFORM.controls.object.material = PHONG.material;
  }
});

// STANDARD

UI.standard.addEventListener('click', event => {
  if (TRANSFORM.controls.object.isMesh) {
    TRANSFORM.controls.object.material = STANDARD.material;
  }
});

// --- PROPERTIES ---

// ANGLE

UI.angle.addEventListener('blur', event => {
  if (TRANSFORM.controls.object.isSpotLight) {
    TRANSFORM.controls.object.angle = parseFloat(UI.angle.value);
  }
})

// BACKGROUND

UI.background.addEventListener('input', event => {
  scene.background = new THREE.Color(UI.background.value);
  scene.fog = new THREE.FogExp2(UI.background.value, 0.02);
});

// COLOR

UI.color.addEventListener('input', event => {
  if (TRANSFORM.controls.object !== undefined) {
    if (TRANSFORM.controls.object.isMesh) {
      updateObjectMaterialColor(TRANSFORM.controls.object);
    } else if (TRANSFORM.controls.object.isLight) {
      updateLightMaterialColor(TRANSFORM.controls.object);
    }
  }
});

// FOG

UI.fog.color.addEventListener('input', event => {
  console.log('fog', event);
  scene.fog = new THREE.FogExp2(UI.fog.color.value, 0.02);
});

// FOV

UI.fov.addEventListener('blur', event => {
  camera.fov = parseFloat(UI.fov.value);
  camera.updateProjectionMatrix();
})

// INTENSITY

UI.intensity.addEventListener('blur', event => {
  if (TRANSFORM.controls.object.isLight) {
    TRANSFORM.controls.object.intensity = parseFloat(UI.intensity.value);
  }
})

// METALNESS

UI.metalness.addEventListener('blur', event => {
  if (TRANSFORM.controls.object.isMesh) {
    TRANSFORM.controls.object.material.metalness = parseFloat(UI.metalness.value);
  }
})

// OPACITY

UI.opacity.addEventListener('blur', event => {
  if (TRANSFORM.controls.object.isMesh) {
    TRANSFORM.controls.object.material.opacity = parseFloat(UI.opacity.value);
  }
})

// PENUMBRA

UI.penumbra.addEventListener('blur', event => {
  if (TRANSFORM.controls.object.isSpotLight) {
    TRANSFORM.controls.object.penumbra = parseFloat(UI.penumbra.value);
  }
})

// ROUGHNESS

UI.roughness.addEventListener('blur', event => {
  if (TRANSFORM.controls.object.isMesh) {
    TRANSFORM.controls.object.material.roughness = parseFloat(UI.roughness.value);
  }
})

// SHININESS

UI.shininess.addEventListener('blur', event => {
  if (TRANSFORM.controls.object.isMesh) {
    TRANSFORM.controls.object.material.shininess = parseFloat(UI.shininess.value);
  }
})

// TRANSPARENT

UI.transparent.addEventListener('click', event => {
  if (TRANSFORM.controls.object.isMesh) {
    if (UI.transparent.checked) {
      TRANSFORM.controls.object.material.transparent = true;
    } else {
      TRANSFORM.controls.object.material.transparent = false;
    }
  }
})

// ZOOM

UI.zoom.addEventListener('blur', event => {
  camera.zoom = parseFloat(UI.zoom.value);
  camera.updateProjectionMatrix();
})
