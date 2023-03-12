import * as PIXI from 'pixi.js';
import { Shader } from '@/utilities/shaders/0x0D';

function fill(graphics: PIXI.Graphics) {
    graphics.clear();
    graphics.beginFill(0x001111, 0.4);
    graphics.drawRect(0, 0, window.innerWidth, window.innerHeight);
    graphics.endFill();
}

export class HavocScene extends PIXI.Container {

    private time: number = 0;
    private filter: PIXI.Filter;
    public graphics: PIXI.Graphics;

    constructor() {
        super();
    
        // add our shader
        this.filter = new PIXI.Filter(Shader.vertex, Shader.fragment, Shader.uniforms);
        this.filters = [this.filter];
    
        // background
        let graphics = new PIXI.Graphics();
        fill(graphics);
        this.addChild(graphics);
        this.graphics = graphics;

        let x: PIXI.DisplayObjectEvents;
    }

    clearBackground() {
        fill(this.graphics)
    }

    update(delta: number) {
        
        this.time++;
        
        if (this.time > 100) {
            this.time = 0;
        }

        this.filter.uniforms.time = this.time * 0.5;
    }

    
    
}
