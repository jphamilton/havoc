import * as PIXI from 'pixi.js';
import { Sprite } from './sprite';

export class Star extends Sprite {
    
    constructor(x: number, y: number, worldWidth: number, worldHeight: number, texture: PIXI.Texture, alpha: number) {
        super(x, y, worldWidth, worldHeight, texture);
        
        this.alpha = alpha;
    }
    
}