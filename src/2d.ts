import * as PIXI from 'pixi.js';

let canvas2d: PIXI.IRenderer<PIXI.ICanvas>;

let SCREEN_HEIGHT = window.innerHeight;
let SCREEN_WIDTH = window.innerWidth;
const ratio = SCREEN_WIDTH / SCREEN_HEIGHT;

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

export { canvas2d, SCREEN_WIDTH, SCREEN_HEIGHT }
