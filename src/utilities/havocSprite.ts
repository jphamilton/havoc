import * as PIXI from 'pixi.js';
import { wrap, Vector2 } from '@/utilities';

export class HavocSprite extends PIXI.Sprite implements Object2D {

    world: Point;
    velocity: Vector2;
    depth: number = 1;
    
    protected worldWidth: number;
    protected worldHeight: number;

    constructor(x: number, y: number, worldWidth: number, worldHeight: number, texture: PIXI.Texture, alpha: number = 1) {
        super(texture);
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.anchor.set(0.5, 0.5);
        this.alpha = alpha;
        this.world = { x, y };
    }

    move(dt: number) {
        // move 
        this.world.x += this.velocity.x * dt;
        this.world.y += this.velocity.y * dt;

        // check for world wrap
        wrap(this.worldWidth, this.worldHeight, this);
    }
}