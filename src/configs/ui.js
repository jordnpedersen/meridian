'use strict';

const ui = {
  'scene': document.getElementById('scene'),
  'sceneObjects': document.getElementById('sceneObjects'),
  'color': document.getElementById('color'),
  'metalness': document.getElementById('metalness'),
  'opacity': document.getElementById('opacity'),
  'roughness': document.getElementById('roughness'),
  'position': {
    'x': document.getElementById('position-x'),
    'y': document.getElementById('position-y'),
    'z': document.getElementById('position-z')
  },
  'rotation': {
    'x': document.getElementById('rotation-x'),
    'y': document.getElementById('rotation-y'),
    'z': document.getElementById('rotation-z')
  },
  'scale': {
    'x': document.getElementById('scale-x'),
    'y': document.getElementById('scale-y'),
    'z': document.getElementById('scale-z')
  }
}

export {ui};
