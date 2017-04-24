import * as THREE from 'three';

let scene3d: THREE.Scene;
let camera3d: THREE.PerspectiveCamera;
let canvas3d: THREE.WebGLRenderer;

const WIDTH  = window.innerWidth;
const HEIGHT = window.innerHeight;

function init() {
    scene3d = new THREE.Scene();
    initCamera();
    initRenderer();
}

function initCamera() {
    camera3d = new THREE.PerspectiveCamera(20, WIDTH / HEIGHT, 1, 1000);
    camera3d.position.set(0, 3.5, 5);
    camera3d.lookAt(scene3d.position);
}

function initRenderer() {
    canvas3d = new THREE.WebGLRenderer({ antialias: true });
    canvas3d.setSize(WIDTH, HEIGHT);
}

init();

export { scene3d, camera3d, canvas3d }