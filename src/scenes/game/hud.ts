import * as PIXI from 'pixi.js';
import { ScreenWidth, ScreenHeight } from '../../2d';

const MapWidth: number = 150;
const MapHeight: number = 150;
const Margin: number = 10;

export class HUD {

    private x: number;
    private y: number;
    private mapScaleX: number;
    private mapScaleY: number;
    
    constructor(private graphics: PIXI.Graphics, private worldWidth: number, private worldHeight: number) {
        this.x  = ScreenWidth() - MapWidth - Margin;
        this.y = ScreenHeight() - MapHeight - Margin;
        
        this.mapScaleX = MapWidth / worldWidth;
        this.mapScaleY = MapHeight / worldHeight;
    }

    update() {
        this.graphics.lineStyle(1, 0x00FFFF, .1);
        this.graphics.drawRect(this.x, this.y, 150, 150);
    }

    track(obj: Object2D, color: number, alpha: number = 1) {
        const mx = obj.world.x * this.mapScaleX;
        const my = obj.world.y * this.mapScaleY;

        this.graphics.lineStyle(1, color, alpha);
        this.graphics.drawRect(this.x + mx, this.y + my, 2, 2);    
    }
}