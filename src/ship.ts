import screen from './screen';
import { Key } from './keys';
import { Vector2 } from './vector2';
import { Sprite } from './sprite';
import { ShipBullet } from './shipbullet';
import Bus from './bus';

const ACCELERATION: number = 0.1;
const BULLET_SPEED: number = 750;
const BULLET_TIME: number = .1;
const FRICTION: number = 0.005;
const ROTATION: number = 5;
const MAX_ACCELERATION: number = 1500;
const MAX_BULLETS: number = 10;
const VELOCITY = 150;

export class Ship extends Sprite {

    thrusting: boolean;
    private trails: WarpTrail[] = [];
    private trailTime: number = 0;
    private bulletTime: number = 0;
    private width2: number;

    velocity: Vector2;
    
    constructor(x: number, y: number, worldWidth: number, worldHeight: number) {
        super(x, y, worldWidth, worldHeight, './assets/ship.png');

        // 270°
        this.rotation = 4.71239;
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
        
        if (Key.isDown(Key.FIRE)) {
            this.fire();
        }

        if (this.bulletTime >= 0) {
            this.bulletTime -= dt;
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

    private rotate(point: Point, angle: number) {
        const x1 = point.x - this.world.x;
        const y1 = point.y - this.world.y;

        const x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle);
        const y2 = x1 * Math.sin(angle) + y1 * Math.cos(angle);

        return {
            x: x2 + this.world.x,
            y: y2 + this.world.y
        }
    }

    private fire() {
        if (this.bulletTime <= 0) { //} && this.bulletCount < MAX_BULLETS) {
            
            this.bulletTime = BULLET_TIME;
            //this.bulletCount++;
            
            const direction = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation));
            
            const t = this.width / 2;
            const right = this.rotate({x: this.world.x + t, y: this.world.y + t}, this.rotation);
            const left = this.rotate({x: this.world.x + t, y: this.world.y - t}, this.rotation);
            
            const rightBullet = new ShipBullet(right.x, right.y, this.worldWidth, this.worldHeight, 1);
            rightBullet.rotation = this.rotation;
            rightBullet.velocity = direction;

            const leftBullet = new ShipBullet(left.x, left.y, this.worldWidth, this.worldHeight, 1);
            leftBullet.rotation = this.rotation;
            leftBullet.velocity = direction;

            const speed = this.velocity.magnitude + BULLET_SPEED;
            leftBullet.velocity = leftBullet.velocity.scale(speed, speed);
            rightBullet.velocity = rightBullet.velocity.scale(speed, speed);
            
            let v = this.velocity.add(leftBullet.velocity);
            
            v.x /= 2;
            v.y /= 2;
            
            leftBullet.velocity.x += v.x;
            leftBullet.velocity.y += v.y;

            rightBullet.velocity.x += v.x;
            rightBullet.velocity.y += v.y;

            // kick back
            const kba = (this.rotation + Math.PI) % (Math.PI * 2);
            const kbv = new Vector2(Math.cos(kba), Math.sin(kba)).scale(5,5);

            this.world.x += kbv.x;
            this.world.y += kbv.y;
            
            Bus.send(Bus.Messages.ShipBulletFired, leftBullet);
            Bus.send(Bus.Messages.ShipBulletFired, rightBullet);
            
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
        this.scale = ship.scale;
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