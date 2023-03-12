import * as PIXI from 'pixi.js';
import { random, randomf, HavocSprite, Vector2} from '@/utilities';

const asteroid1 = PIXI.Texture.from('./assets/asteroid-1.png');

class Asteroid extends HavocSprite {

    private rot: number;

    constructor(x: number, y: number, worldWidth: number, worldHeight: number, texture: PIXI.Texture) {
        super(x, y, worldWidth, worldHeight, texture);
        this.alpha = .4;
        this.rot = random(1, 10) % 2 === 0 ? -.01 : .01;
        this.rotation = randomf(0, Math.PI * 2);
        this.velocity = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation)).scale(200, 200);
        
    }

    update(dt: number) {
        this.move(dt);
        this.rotation += this.rot;
    }
}

export class Asteroids {

    all: Asteroid[] = [];

    constructor(scene: PIXI.Container, worldWidth: number, worldHeight: number) {

        for(let i = 0; i < 10; i++) {

            const x = random(0, worldWidth);
            const y = random(0, worldHeight);
            const asteroid = new Asteroid(x, y, worldWidth, worldHeight, asteroid1);
            this.all.push(asteroid);
            scene.addChild(asteroid);
        }

    }

    update(dt: number) {
        this.all.forEach(a => {
            a.update(dt);
        });
    }
}