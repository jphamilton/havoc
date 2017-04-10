import screen from './screen';
import { Star } from './star';
import { random, wrap } from './util';

export class StarField {

    stars: Star[] = [];
    private farLayer: ISprite[] = [];
    private midLayer: ISprite[] = [];
    
    constructor(private worldWidth: number, private worldHeight: number) {
        
        // create some random stars
        for(let i = 0; i < 200; i++) {
            const x = random(0, worldWidth);
            const y = random(0, worldHeight);
            const star = new Star(x, y, worldWidth, worldHeight);
            
            this.stars.push(star);

            if (star.alpha <= .4) {
                this.farLayer.push(star);
            } else if (star.alpha < .7) {
                this.midLayer.push(star);
            }

            screen.stage.addChild(star);
        }


    }

    move(x: number, y: number) {
        this.farLayer.forEach(o => {
            o.world.x += x * .5;
            o.world.y += y * .5;
        });

        wrap(this.worldWidth, this.worldHeight, ...this.farLayer);

        this.midLayer.forEach(o => {
            o.world.x += x * .2;
            o.world.y += y * .2;
        });

        wrap(this.worldWidth, this.worldHeight, ...this.midLayer);
        
    }
}