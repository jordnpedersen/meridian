import * as THREE from 'three';
import * as DEFAULT from '/src/config/default.js'
import {scene} from '/src/main.js'

// TODO: Make an object constructor for the object properties
// TODO: Have parameters for custom properties given by user

/**
 * Adds a cube to the scene.
 */
function addCube() {
    const geometry = new THREE.BoxGeometry( DEFAULT.dimensions.x, DEFAULT.dimensions.y, DEFAULT.dimensions.z );
    const cube = new THREE.Mesh( geometry, DEFAULT.material );
    scene.add( cube );
}

export { addCube }