import { Key } from './keys';
import { Vector2 } from './vector2';
import { Sprite } from './sprite';
import screen from './screen';

const ACCELERATION: number = 0.1;
const BULLET_SPEED: number = 1000;
const BULLET_TIME: number = .1;
const FRICTION: number = 0.005;
const ROTATION: number = 5;
const MAX_ACCELERATION: number = 2000;
const MAX_BULLETS: number = 10;
const VELOCITY = 150;

export class Ship extends Sprite {

    private thrusting: boolean;
    private trails: WarpTrail[] = [];
    private trailTime: number = 0;

    velocity: Vector2;
    
    constructor(x: number, y: number) {
        super(x, y, './assets/ship.png');

        this.velocity = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation));
    }

    update(dt: number) {
        // move ship
        this.world.x += this.velocity.x * dt;
        this.world.y += this.velocity.y * dt;

        if (Key.isPressed(Key.LEFT)) {
            this.rotation -= 0.5 * dt;
        } 

        if (Key.isDown(Key.LEFT)) {
            this.rotation -= ROTATION * dt;
        } 

        if (Key.isPressed(Key.RIGHT)) {
            this.rotation += 0.5 * dt;
        }

        if (Key.isDown(Key.RIGHT)) {
            this.rotation += ROTATION * dt;
        } 

        if (Key.isDown(Key.UP)) {
            this.thrusting = true;
            this.thrust();
        } else {
            this.thrusting = false;
        }
        
        if (this.trailTime > 0) {
            this.trailTime -= dt;
        }

        const hasTrails = this.thrusting && (Math.abs(this.velocity.x) > 300 || Math.abs(this.velocity.y) > 300);

        if (hasTrails && this.trailTime <= 0) {
            this.trails.push(new WarpTrail(this));
            this.trailTime = 0.06;
        }

        if (this.trails.length) {
            this.trails.forEach(trail => trail.update(dt));
            this.trails = this.trails.filter(trail => trail.alpha > 0);
        } 
        
        if (!this.thrusting) {
            this.velocity.x -= this.velocity.x * FRICTION;
            this.velocity.y -= this.velocity.y * FRICTION; 
        }
    }

    private thrust() {
        const v = new Vector2(Math.cos(this.rotation) * VELOCITY * ACCELERATION, Math.sin(this.rotation) * VELOCITY * ACCELERATION);

        this.velocity.x += v.x;
        this.velocity.y += v.y;

        if (this.velocity.x > MAX_ACCELERATION) {
            this.velocity.x = MAX_ACCELERATION;
        } 

        if (this.velocity.x < -MAX_ACCELERATION) {
            this.velocity.x = -MAX_ACCELERATION;
        }

        if (this.velocity.y > MAX_ACCELERATION) {
            this.velocity.y = MAX_ACCELERATION;
        }

        if (this.velocity.y < -MAX_ACCELERATION) {
            this.velocity.y = -MAX_ACCELERATION;
        }
    }

}

class WarpTrail extends PIXI.Sprite {


    constructor(ship: Ship) {
        super(ship.texture);

        this.anchor.set(0.5);
        this.rotation = ship.rotation;
        this.x = ship.x;
        this.y = ship.y;
        this.blendMode = PIXI.BLEND_MODES.COLOR_DODGE;
        this.alpha = .4;

        screen.stage.addChild(this);
    }

    update(dt: number) {
        this.alpha -= 0.01;

        if (this.alpha <= 0) {
            screen.stage.removeChild(this);
            this.destroy();
        }
    }
}