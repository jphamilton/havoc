import * as PIXI from 'pixi.js';
import { Shader } from '@/utilities/shaders/0x0D';
import { Bus } from '@/utilities';

let canvas2d: PIXI.IRenderer<PIXI.ICanvas>;
let scene2d: PIXI.Container;
let filter: PIXI.Filter;

// initial dimensions
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

function init() {

    const options: Partial<PIXI.IRenderOptions> = {
        antialias: true,
        autoDensity: true,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    };

    canvas2d = new PIXI.Renderer(options);
    
    scene2d = new PIXI.Container();
    
    // shader
    filter = new PIXI.Filter(Shader.vertex, Shader.fragment, Shader.uniforms);
    scene2d.filters = [filter];

    document.body.appendChild(canvas2d.view as any);

    window.addEventListener("resize", onResize);
}

function onResize() {
    
    // Determine which screen dimension is most constrained
    const ratio = Math.min(window.innerWidth / SCREEN_WIDTH, window.innerHeight / SCREEN_HEIGHT);
 
    // Scale the view appropriately to fill that dimension
    scene2d.scale.x = scene2d.scale.y = ratio;

    // Update the renderer dimensions
    canvas2d.resize(Math.ceil(SCREEN_WIDTH * ratio), Math.ceil(SCREEN_HEIGHT * ratio));

    Bus.send(Bus.Messages.Resize, window.innerWidth, window.innerHeight);    
}

init();

export { canvas2d, scene2d, filter, SCREEN_WIDTH, SCREEN_HEIGHT }
