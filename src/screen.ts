import * as PIXI from 'pixi.js';

export class Screen {

    width: number;
    height: number;
    renderer: PIXI.WebGLRenderer;
    stage: PIXI.Container;

    constructor() {
        this.init();

        // The stage is the root container that will hold everything in our scene
        this.stage = new PIXI.Container();

        window.addEventListener('resize', () => {
            this.init();
        });
    }

    init() {
        // Get the screen width and height
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        const options: PIXI.IRendererOptions = {
            antialias: true,
            autoResize: true,
            resolution: 2
        };

        this.renderer = new PIXI.WebGLRenderer(this.width, this.height, options);

        // Add the render view object into the page
        document.body.appendChild(this.renderer.view);
    }

    render() {
        this.renderer.render(this.stage);
    }
    
}

export default new Screen();
