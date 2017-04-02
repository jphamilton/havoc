import { VECTOR } from './lut';

export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    static fromAngle(angleInDegrees: number, magnitude: number = 1) {
        const v = VECTOR[angleInDegrees];
        return new Vector2(v.x * magnitude, v.y * magnitude);
    }

    get magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    get unit(): IVector2 {
        const magnitude = this.magnitude;
        const x = this.x / magnitude;
        const y = this.y / magnitude;
        return new Vector2(x, y);
    }

    dot(vector: IVector2): number {
        return (this.x * vector.x) + (this.y * vector.y);
    }

    equals(vector: IVector2) {
        return this.x === vector.x && this.y === vector.y;
    }
}