import * as PIXI from 'pixi.js';
import { random, random_array, wrap, HavocSprite } from '@/utilities';

let starTexture: PIXI.BaseTexture;
let starTypes: PIXI.Texture[];
let farLayer: Object2D[];
let midLayer: Object2D[];
let nearLayer: Object2D[];
let stars: HavocSprite[];
let width: number;
let height: number;

function moveLayer(layer: Object2D[], x: number, y: number, factor: number) {
    layer.forEach(o => {
        o.world.x += x * factor;
        o.world.y += y * factor;
    });

    wrap(width, height, ...layer);
}

function createStar(alphas: number[]): HavocSprite {
    const x = random(0, width);
    const y = random(0, height);
    const texture = random_array(starTypes);
    const alpha = random_array(alphas);
    const star = new HavocSprite(x, y, width, height, texture, alpha);
    
    stars.push(star);

    if (star.alpha <= .3) {
        farLayer.push(star);
    } else if (star.alpha <= .7) {
        midLayer.push(star);
    } else {
        nearLayer.push(star);
    }

    return star;
}

export class StarField {
    
    constructor(private scene: PIXI.Container, worldWidth: number, worldHeight: number) {
        
        starTypes = [];
        farLayer = [];
        midLayer = [];
        nearLayer = [];
        stars = [];
        width = worldWidth;
        height = worldHeight;

        starTexture = PIXI.BaseTexture.from('./assets/stars-16x4.png');

        starTypes = [
            new PIXI.Texture(starTexture, new PIXI.Rectangle(0, 0, 4, 4)),
            new PIXI.Texture(starTexture, new PIXI.Rectangle(4, 0, 4, 4)),
            new PIXI.Texture(starTexture, new PIXI.Rectangle(8, 0, 4, 4)),
            new PIXI.Texture(starTexture, new PIXI.Rectangle(12, 0, 4, 4))
        ];

        this.init();
    }

    private init() {
        const alphas = [.1, .2, .3, .4, .5, .6, .7, .8, .9, 1];

        // create some random stars
        for(let i = 0; i < 200; i++) {
            const star = createStar(alphas);
            this.scene.addChild(star);
        }
    }

    get all() {
        return stars;
    }
    
    move(x: number, y: number) {
        moveLayer(farLayer, x, y, 0.5);
        moveLayer(midLayer, x, y, 0.2);
        moveLayer(nearLayer, x, y, 0.1);
    }
    
}