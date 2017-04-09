import screen from './screen';
import { Vector2 } from './vector2';

export class Sprite extends PIXI.Sprite implements ISprite {

    world: Point;
    velocity: Vector2;
    depth: number = 1;
    
    protected worldWidth: number;
    protected worldHeight: number;

    constructor(x: number, y: number, worldWidth: number, worldHeight: number, image: string) {
        super(PIXI.Texture.fromImage(image));
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.anchor.set(0.5, 0.5);
        
        this.world = { x, y };
    }

    move(dt: number) {
        // move 
        this.world.x += this.velocity.x * dt;
        this.world.y += this.velocity.y * dt;

        // wrap if necessary
        if (this.world.x > this.worldWidth) {
            this.world.x -= this.worldWidth;
        }

        if (this.world.x < 0) {
            this.world.x += this.worldWidth;
        }

        if (this.world.y > this.worldHeight) {
            this.world.y -= this.worldHeight;
        }

        if (this.world.y < 0) {
            this.world.y += this.worldHeight;
        }
    }
}