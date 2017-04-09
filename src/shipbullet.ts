import Bus from './bus';
import { Sprite } from './sprite';
import { Vector2 } from './vector2';

export class ShipBullet extends Sprite {
    
    velocity: Vector2;

    private life: number;

    constructor(x: number, y: number, worldWidth: number, worldHeight: number, lifeInSeconds: number) {
        super(x, y, worldWidth, worldHeight, './assets/ship-bullet.png');
        this.life = lifeInSeconds;
        this.anchor.set(.5, .5)
    }
    
    update(dt: number) {
        this.move(dt);

        this.life -= dt;

        if (this.life <= 0) {
            Bus.send(Bus.Messages.ShipBulletExpired, this);
        }
    }
}