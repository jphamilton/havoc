import * as PIXI from 'pixi.js';
import screen from './screen';

const MapWidth: number = 150;
const MapHeight: number = 150;

export class HUD {

    private x: number;
    private y: number;
    private mapScaleX: number;
    private mapScaleY: number;
    
    constructor(private graphics: PIXI.Graphics, private worldWidth: number, private worldHeight: number) {

        const size = 150;
        const margin = 10;
        
        this.x  = screen.width - size - margin;
        this.y = screen.height - size - margin;
        
        // graphics.lineStyle(1, 0xFFFFFF, .1);
        // graphics.drawRect(this.x, this.y, 150, 150);

        this.mapScaleX = MapWidth / worldWidth;
        this.mapScaleY = MapHeight / worldHeight;
    }

    update() {
        this.graphics.lineStyle(1, 0xFFFFFF, .1);
        this.graphics.drawRect(this.x, this.y, 150, 150);
    }

    track(obj: ISprite, color: number, alpha: number = 1) {
        const mx = obj.world.x * this.mapScaleX;
        const my = obj.world.y * this.mapScaleY;

        this.graphics.lineStyle(1, color, alpha);
        this.graphics.drawRect(this.x + mx, this.y + my, 2, 2);    
    }
}