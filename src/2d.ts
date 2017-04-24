import * as PIXI from 'pixi.js';

let canvas2d: PIXI.WebGLRenderer;
let scene2d: PIXI.Container;

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

function init() {

    const options: PIXI.IRendererOptions = {
        antialias: true,
        autoResize: true,
        resolution: 2
    };

    canvas2d = new PIXI.WebGLRenderer(SCREEN_WIDTH, SCREEN_HEIGHT, options);
    scene2d = new PIXI.Container();

    document.body.appendChild(canvas2d.view);
}

init();

export { canvas2d, scene2d, SCREEN_WIDTH, SCREEN_HEIGHT }
