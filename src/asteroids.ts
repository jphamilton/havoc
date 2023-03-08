import { scene2d } from './2d';
import { Sprite } from './sprite';
import { Vector2 } from './vector2';
import { random, randomf } from './utils/random';

const asteroid1 = PIXI.Texture.fromImage('./assets/asteroid-1.png');

class Asteroid extends Sprite {

    private rot;

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

    asteroids: Asteroid[] = [];

    constructor(private worldWidth: number, private worldHeight: number) {

        for(let i = 0; i < 10; i++) {

            const x = random(0, worldWidth);
            const y = random(0, worldHeight);
            const asteroid = new Asteroid(x, y, worldWidth, worldHeight, asteroid1);
            this.asteroids.push(asteroid);
            scene2d.addChild(asteroid);
        }

    }

    update(dt: number) {
        this.asteroids.forEach(a => {
            a.update(dt);
        });
    }
}