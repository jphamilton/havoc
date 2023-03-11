import * as PIXI from 'pixi.js';
import { HavocSprite } from '@/utilities';

export class Star extends HavocSprite {
    
    constructor(x: number, y: number, worldWidth: number, worldHeight: number, texture: PIXI.Texture, alpha: number) {
        super(x, y, worldWidth, worldHeight, texture);
        
        this.alpha = alpha;
    }
    
}