import * as PIXI from 'pixi.js';
import { Bus, HavocSprite } from '@/utilities';

const shipBulletTexture = PIXI.Texture.from('./assets/ship-bullet.png');

export class ShipBullet extends HavocSprite {
    
    private life: number;

    constructor(x: number, y: number, worldWidth: number, worldHeight: number, lifeInSeconds: number) {
        super(x, y, worldWidth, worldHeight, shipBulletTexture);
        this.life = lifeInSeconds;
        this.anchor.set(.5, .5);
    }
    
    update(dt: number) {
        this.move(dt);

        this.life -= dt;

        if (this.life <= 0 || !this.visible) {
            Bus.send(Bus.Messages.ShipBulletExpired, this);
        }
    }
}