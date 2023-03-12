import * as THREE from 'three';

let scene3d: THREE.Scene;
let camera3d: THREE.PerspectiveCamera;
let canvas3d: THREE.WebGLRenderer;

function init() {
    scene3d = new THREE.Scene();
    
    camera3d = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 1000);
    camera3d.position.set(0, 3.5, 5);
    camera3d.lookAt(scene3d.position);

    canvas3d = new THREE.WebGLRenderer({ antialias: true });
    canvas3d.setSize(window.innerWidth, window.innerHeight);
    canvas3d.setClearColor( 0x000000, 0);
}

init();

export { scene3d, camera3d, canvas3d }