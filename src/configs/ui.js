'use strict';

const ui = {
  'add': document.getElementById('add'),
  'edit': document.getElementById('edit'),
  'sceneObjects': document.getElementById('sceneObjects'),
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
  },
  'color': document.getElementById('color'),
  'metalness': document.getElementById('metalness'),
  'opacity': document.getElementById('opacity'),
  'roughness': document.getElementById('roughness')
}

export {ui};
