import * as PIXI from 'pixi.js';
import screen from './screen';
import Bus from './bus';
import { Shader } from './shaders/0x0D';

import { random, wrap, lerp } from './util';
import { Camera } from './camera';
import { Background } from './background';
import { StarField } from './starfield';
import { Ship } from './ship';
import { ShipBullet } from './shipbullet';
import { Score } from './score';
import { HUD } from './hud';

export class World implements IUpdateRender, Rect {
    private graphics: PIXI.Graphics;
    private filter: PIXI.Filter;
    private camera: Camera;    
    
    
    private background: Background;
    private ship: Ship;
    private shipBullets: ShipBullet[] = [];
    private score: Score;
    private starField: StarField;
    private hud: HUD;

    private time: number = 0;

    constructor(public width: number, public height: number) {

        // create background
        this.graphics = new PIXI.Graphics();
        this.graphics.clear();
        
        screen.stage.addChild(this.graphics);

        this.background = new Background(this.graphics, width, height);

        // create ship at the center of the world
        this.ship = new Ship(width / 2, height / 2, this.width, this.height);
        screen.stage.addChild(this.ship);

        // stars!
        this.starField = new StarField(this.width, this.height);

        // score
        this.score = new Score();
        this.score.x = 80;
        this.score.y = 10;

        // heads up display
        this.hud = new HUD(this.graphics, this.width, this.height);

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

        
        const delta = this.camera.follow(this.ship.world.x, this.ship.world.y, lerp);

        this.starField.move(delta.x, delta.y);
    }

    render(dt: number) {
        const all = [this.ship,...this.shipBullets, ...this.starField.stars];
        
        // hide all objects
        all.forEach(obj => obj.visible = false);

        // what can the camera see?
        const visible: ISprite[] = this.camera.translateToScreen(all);
        
        // show visible objects
        visible.forEach(obj => obj.visible = true);

        // update time for CRT effect
        this.filter.uniforms.time = this.time * 0.5;

        this.graphics.clear();

        this.hud.update();
        this.hud.track(this.ship, 0x00FFFF, .5);

        screen.render();
    }

    
}