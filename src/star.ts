import { random } from './util';
import { Sprite } from './sprite';

export class Star extends Sprite {
    
    constructor(x: number, y: number) {
        super(x, y, '../assets/star-4x4.png');

        this.alpha = random(.5, 1);
    }
    
    update(dt: number) {
        this.alpha = random(.5, 1);
    }
}