import * as PIXI from 'pixi.js';
import { Bus } from '@/utilities';

let canvas2d: PIXI.IRenderer<PIXI.ICanvas>;

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
    

    document.body.appendChild(canvas2d.view as any);

    window.addEventListener("resize", onResize);
}

function onResize() {
    
    // Determine which screen dimension is most constrained
    const ratio = Math.min(window.innerWidth / SCREEN_WIDTH, window.innerHeight / SCREEN_HEIGHT);
 
    // Scale the view appropriately to fill that dimension
    //scene2d.scale.x = scene2d.scale.y = ratio;

    // Update the renderer dimensions
    //canvas2d.resize(Math.ceil(SCREEN_WIDTH * ratio), Math.ceil(SCREEN_HEIGHT * ratio));

    Bus.send(Bus.Messages.Resize, window.innerWidth, window.innerHeight);    
}


init();

export { canvas2d, SCREEN_WIDTH, SCREEN_HEIGHT }
