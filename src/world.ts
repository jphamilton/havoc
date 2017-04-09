import * as PIXI from 'pixi.js';
import screen from './screen';
import Bus from './bus';

import { random } from './util';
import { Camera } from './camera';
import { Star } from './star';
import { Ship } from './ship';
import { ShipBullet } from './shipbullet';
import { Shader } from './shaders/0x0D';

const MapWidth: number = 150;
const MapHeight: number = 150;

export class World implements IUpdateRender, Rect {
    private graphics: PIXI.Graphics;
    private filter: PIXI.Filter;
    private camera: Camera;    
    
    private stars: Star[] = [];
    private ship: Ship;
    private shipBullets: ShipBullet[] = [];
    
    private time: number = 0;

    private mapScaleX: number;
    private mapScaleY: number;

    constructor(public width: number, public height: number) {

        this.mapScaleX = MapWidth / this.width;
        this.mapScaleY = MapHeight / this.height;
    
        // create background
        this.graphics = new PIXI.Graphics();
        this.graphics.clear();
        this.graphics.beginFill(0x001111, .5);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();

        
        const background = new PIXI.Sprite(this.graphics.generateCanvasTexture());
        screen.stage.addChild(background);
        screen.stage.addChild(this.graphics);

        // create ship at the center of the world
        this.ship = new Ship(width / 2, height / 2, this.width, this.height);
        screen.stage.addChild(this.ship);

        // create some random stars
        for(let i = 0; i < 100; i++) {
            const x = random(0, this.width);
            const y = random(0, this.height);
            const star = new Star(x, y, this.width, this.height);
            this.stars.push(star);
            screen.stage.addChild(star);
        }

        //Create our Pixi filter using our custom shader code
        this.filter = new PIXI.Filter(Shader.vertex, Shader.fragment, Shader.uniforms);
        
        screen.stage.filters = [this.filter];

        this.camera = new Camera(this.ship.world.x, this.ship.world.y, screen.width, screen.height, width, height);    
        
        // subscribe to messages
        Bus.subscribe(Bus.Messages.ShipBulletFired, (bullet:ShipBullet) => {
            this.shipBullets.push(bullet);
            screen.stage.addChild(bullet);
        });

        Bus.subscribe(Bus.Messages.ShipBulletExpired, (bullet: ShipBullet) => {
            this.shipBullets = this.shipBullets.filter(x => x !== bullet);
            screen.stage.removeChild(bullet);
            bullet.destroy();
        });


    }

    get top() {
        return 0;
    }

    get left() {
        return 0;
    }

    get right() {
        return this.width;
    }

    get bottom() {
        return this.height;
    }

    lerp2(current, target, amount) {
        return (target - current) * amount;
    }

    update(dt: number) {
        this.time++;

        // move objects and stuff around the world here
        this.ship.update(dt);
        this.shipBullets.forEach(bullet => bullet.update(dt));

        // wrap ship if necessary
        if (this.ship.world.x > this.width) {
            this.ship.world.x -= this.width;
            this.camera.x -= this.width;
        }

        if (this.ship.world.x < 0) {
            this.ship.world.x += this.width;
            this.camera.x += this.width;
        }

        if (this.ship.world.y > this.height) {
            this.ship.world.y -= this.height;
            this.camera.y -= this.height;
        }

        if (this.ship.world.y < 0) {
            this.ship.world.y += this.height;
            this.camera.y += this.height;
        }

       
        const dx = this.lerp2(this.camera.x, this.ship.world.x, .1);
        const dy = this.lerp2(this.camera.y, this.ship.world.y, .1);
        
        this.camera.x += dx;
        this.camera.y += dy;
    }

    render(dt: number) {
        const all = [this.ship,...this.shipBullets, ...this.stars];

        
        // hide all objects
        all.forEach(obj => obj.visible = false);

        // what can the camera see?
        const visible: ISprite[] = this.camera.translateToScreen(all);
        
        // show visible objects
        visible.forEach(obj => obj.visible = true);

        this.filter.uniforms.time = this.time * 0.5;

        this.graphics.clear();

        // radar
        const size = 150;
        const margin = 10;
        const rx = screen.width - size - margin;
        const ry = screen.height - size - margin;
        this.graphics.lineStyle(1, 0xFFFFFF, .1);
        this.graphics.drawRect(rx, ry, 150, 150);

        
        const mx = this.ship.world.x * this.mapScaleX;
        const my = this.ship.world.y * this.mapScaleY;

        this.graphics.lineStyle(1, 0xFFFFFF, 1);
        this.graphics.drawRect(rx + mx, ry + my, 2, 2);

        screen.render();
    }

    
}