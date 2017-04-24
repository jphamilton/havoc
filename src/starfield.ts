import { scene2d } from './2d';
import { Star } from './star';
import { wrap } from './util';
import { random, random_array } from './utils/random';

export class StarField {

    stars: Star[] = [];
    private base: PIXI.BaseTexture;
    private types: PIXI.Texture[] = [];
    private farLayer: ISprite[] = [];
    private midLayer: ISprite[] = [];
    private nearLayer: ISprite[] = [];
    
    constructor(private worldWidth: number, private worldHeight: number) {
        
        const createTypes = () => {
            this.types = [
                new PIXI.Texture(this.base, new PIXI.Rectangle(0, 0, 4, 4)),
                new PIXI.Texture(this.base, new PIXI.Rectangle(4, 0, 4, 4)),
                new PIXI.Texture(this.base, new PIXI.Rectangle(8, 0, 4, 4)),
                new PIXI.Texture(this.base, new PIXI.Rectangle(12, 0, 4, 4))
            ];
        };

        this.base = PIXI.BaseTexture.fromImage('./assets/stars-16x4.png');

        if (this.base.isLoading) {

            this.base.on('update', () => {
                createTypes();        
                this.init();
            });
        } else {
            createTypes();
            this.init();
        }
        

    }

    private init() {
        const alphas = [.1, .2, .3, .4, .5, .6, .7, .8, .9, 1];

        // create some random stars
        for(let i = 0; i < 200; i++) {
            const x = random(0, this.worldWidth);
            const y = random(0, this.worldHeight);
            const texture = random_array(this.types);
            const alpha = random_array(alphas);
            const star = new Star(x, y, this.worldWidth, this.worldHeight, texture, alpha);
            
            this.stars.push(star);

            if (star.alpha <= .4) {
                this.farLayer.push(star);
            } else if (star.alpha <= .7) {
                this.midLayer.push(star);
            } else {
                this.nearLayer.push(star);
            }

            scene2d.addChild(star);
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

        this.nearLayer.forEach(o => {
            o.world.x += x * .1;
            o.world.y += y * .1;
        });

        wrap(this.worldWidth, this.worldHeight, ...this.nearLayer);
        
    }
    
}