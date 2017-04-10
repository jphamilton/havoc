const VECTOR = {};
const PI2 = 2 * Math.PI;

for(let i = 0; i <= 360; i++) {
    const t = PI2 * (i / 360);
    
    VECTOR[i] = {
        x: Math.cos(t),
        y: Math.sin(t)
    }
}

export class Vector2 {

    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static fromAngle(angleInDegrees: number, velocity: number = 1): Vector2 {
        const x = VECTOR[angleInDegrees].x * velocity;
        const y = VECTOR[angleInDegrees].y * velocity;
        return new Vector2(x, y);
    }

    static fromXY(p1: Point, p2: Point, velocity: number = 1): Vector2 {
        let x = p1.x - p2.x;
        let y = p1.y - p2.y;
        const hyp = Math.sqrt(x * x + y * y);
        x /= hyp;
        y /= hyp;
        return new Vector2(x * velocity, y * velocity);
    }

    accelerate(angle: number, speed: number, factor: number, maxSpeed: number): Vector2 {
        const d = speed * factor;
        const v = new Vector2(Math.cos(angle) * d, Math.sin(angle) * d);
        const result: Vector2 = this.copy();

        result.x += v.x;
        result.y += v.y;

        if (result.x > maxSpeed) {
            result.x = maxSpeed;
        } 

        if (result.x < -maxSpeed) {
            result.x = -maxSpeed;
        }

        if (result.y > maxSpeed) {
            result.y = maxSpeed;
        }

        if (result.y < -maxSpeed) {
            result.y = -maxSpeed;
        }

        return result;
    }
    
    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    normalize(): Vector2 {
        const m = this.magnitude;
        return new Vector2(this.x / m, this.y / m);
    }
    
    copy() {
        return new Vector2(this.x, this.y);
    }

    dot(v: Vector2) {
        return (this.x * v.x) + (this.y * v.y);
    }

    scale(xscale: number, yscale: number) {
        return new Vector2(this.x * xscale, this.y * yscale);
    }

    get magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    
}