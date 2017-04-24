import { Graphics } from 'pixi.js';
import { scene2d } from './2d';

// CRT background
export class Background {

    private background: PIXI.Sprite;

    constructor(graphics: Graphics, color: number, alpha: number) {
        graphics.beginFill(color, alpha);
        graphics.drawRect(0, 0, screen.width, screen.height);
        graphics.endFill();

        this.background = new PIXI.Sprite(graphics.generateCanvasTexture());
        scene2d.addChild(this.background);
    }


}