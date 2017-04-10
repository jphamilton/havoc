import { Graphics } from 'pixi.js';
import screen from './screen';

// CRT background
export class Background {

    private background: PIXI.Sprite;

    constructor(graphics: Graphics, worldWidth: number, worldHeight: number) {
        graphics.beginFill(0x001111, .5);
        graphics.drawRect(0, 0, worldWidth, worldHeight);
        graphics.endFill();

        this.background = new PIXI.Sprite(graphics.generateCanvasTexture());
        screen.stage.addChild(this.background);
    }


}