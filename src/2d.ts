import * as PIXI from 'pixi.js';

let canvas2d: PIXI.WebGLRenderer;
let scene2d: PIXI.Container;

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

function init() {

    const options: PIXI.WebGLRendererOptions = {
        antialias: true,
        autoResize: true,
        resolution: 2
    };

    canvas2d = new PIXI.WebGLRenderer(SCREEN_WIDTH, SCREEN_HEIGHT, options);
    scene2d = new PIXI.Container();

    document.body.appendChild(canvas2d.view);

    window.addEventListener("resize", resize);
}

function resize() {
    // Determine which screen dimension is most constrained
    const ratio = Math.min(window.innerWidth / SCREEN_WIDTH, window.innerHeight / SCREEN_HEIGHT);
 
    // Scale the view appropriately to fill that dimension
    scene2d.scale.x = scene2d.scale.y = ratio;

    // Update the renderer dimensions
    canvas2d.resize(Math.ceil(SCREEN_WIDTH * ratio), Math.ceil(SCREEN_HEIGHT * ratio));
}

init();

export { canvas2d, scene2d, SCREEN_WIDTH, SCREEN_HEIGHT }
