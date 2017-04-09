import { random } from './util';
import { Sprite } from './sprite';

export class Star extends Sprite {
    
    constructor(x: number, y: number, worldWidth: number, worldHeight: number) {
        super(x, y, worldWidth, worldHeight, './assets/star-4x4.png');
        
        this.alpha = random(.1, 1);

        if (this.alpha < .5) {
            this.depth = .5;
        }
    }
    
    update(dt: number) {
        
    }
}