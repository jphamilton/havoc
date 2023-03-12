import * as PIXI from 'pixi.js';
import { Bus } from '@/utilities';

let canvas2d: PIXI.IRenderer<PIXI.ICanvas>;

const ratio = window.innerWidth / window.innerHeight;

console.log(ratio);

function init() {

    const options: Partial<PIXI.IRenderOptions> = {
        antialias: true,
        autoDensity: true,
        width: window.innerWidth,
        height: window.innerHeight
    };

    canvas2d = new PIXI.Renderer(options);

    document.body.appendChild(canvas2d.view as any);

    onResize();

    window.addEventListener('resize', onResize);
}

function onResize() {

    if (window.innerWidth / window.innerHeight >= ratio) {
        var w = window.innerHeight * ratio;
        var h = window.innerHeight;
    } else {
        var w = window.innerWidth;
        var h = window.innerWidth / ratio;
    }

    canvas2d.view.style.width = w + 'px';
    canvas2d.view.style.height = h + 'px';
}


init();

export { canvas2d } //, SCREEN_WIDTH, SCREEN_HEIGHT }

export function ScreenWidth() {
    return window.innerWidth;
}

export function ScreenHeight() {
    return window.innerHeight;
}