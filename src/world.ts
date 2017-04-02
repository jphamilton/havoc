import * as PIXI from 'pixi.js';
import screen from './screen';
import { random } from './util';
import { Camera } from './camera';
import { Star } from './star';
import { Ship } from './ship';
import { Shader } from './shaders/0x0D';

export class World implements IUpdateRender, Rect {
    private camera: Camera;    
    private stars: Star[] = [];
    private ship: Ship;
    private filter: PIXI.Filter;
    private uniforms: any;
    private time: number = 0;

    constructor(public width: number, public height: number) {

        // create background
        const graphics = new PIXI.Graphics();
        graphics.clear();
        graphics.beginFill(0x001111, .5);
        graphics.drawRect(0, 0, this.width, this.height);
        graphics.endFill();

        const background = new PIXI.Sprite(graphics.generateCanvasTexture());

        screen.stage.addChild(background);

        // create ship at the center of the world
        this.ship = new Ship(width / 2, height / 2);
        screen.stage.addChild(this.ship);

        // create some random stars
        for(let i = 0; i < 100; i++) {
            const x = random(0, this.width);
            const y = random(0, this.height);
            const star = new Star(x, y);
            this.stars.push(star);
            screen.stage.addChild(star);
        }

        // add the shader
        this.uniforms = {
            time: {
                type: '1f',
                value: 0.0
            }
        };

        //Create our Pixi filter using our custom shader code
        this.filter = new PIXI.Filter(Shader.vertex, Shader.fragment, this.uniforms);
        
        screen.stage.filters = [this.filter];

        this.camera = new Camera(this.ship.world.x, this.ship.world.y, screen.width, screen.height, width, height);    
        
        this.camera.follow(this.ship);

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

        this.camera.update(dt); 
    }

    render(dt: number) {
        const all = [this.ship, ...this.stars];

        // hide all objects
        all.forEach(obj => obj.visible = false);

        // what can the camera see?
        const visible = this.camera.translateToScreen(all);
        
        // show visible objects
        visible.forEach(obj => obj.visible = true);

        this.filter.uniforms.time = this.time * 0.5;
        screen.render();
    }

    private checkWrap(obj: IWorld) {
        if (obj.world.x > this.width) {
            obj.world.x -= this.width;
        }

        if (obj.world.x < 0) {
            obj.world.x += this.width;
        }

        if (obj.world.y > this.height) {
            obj.world.y -= this.height;
        }

        if (obj.world.y < 0) {
            obj.world.y += this.height;
        }
    }

}