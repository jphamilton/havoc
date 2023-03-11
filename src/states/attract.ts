import * as PIXI from 'pixi.js';
import { canvas2d, scene2d, filter , SCREEN_WIDTH, SCREEN_HEIGHT } from '../2d';
import { canvas3d, scene3d, camera3d } from '../3d';
import { Title3d } from '../title3d';
import { Camera } from '../camera';
import { StarField } from '../starfield';
import { randomf, Bus, CrtBackground, Key, Text, Timers, Vector2 } from '@/utilities';
import { fx1, fx2, rumble } from '../sounds';

export class AttractState implements UpdateRender {
    private score: Text;
    private title3d: Title3d;
    private texture3d: PIXI.Texture;
    private titleSprite3d: PIXI.Sprite;
    private graphics: PIXI.Graphics;
    private insertCoin: Text;
    private timers: Timers;
    private camera2d: Camera;
    private time: number = 0;

    private worldWidth: number;
    private worldHeight: number;
    private starField: StarField;
    private starVector: Vector2;

    constructor() {
        this.init();
    }

    private init() {
        this.worldWidth = SCREEN_WIDTH * 4;
        this.worldHeight = SCREEN_HEIGHT * 4;

        this.title3d = new Title3d();
        this.texture3d = PIXI.Texture.from(canvas3d.domElement);
        this.titleSprite3d = new PIXI.Sprite(this.texture3d);
        scene2d.addChild(this.titleSprite3d);

        // background
        this.graphics = new PIXI.Graphics();
        CrtBackground(this.graphics);
        scene2d.addChild(this.graphics);

        
        // push start
        this.insertCoin = new Text(scene2d, 'I N S E R T  C O I N', 64);
        this.insertCoin.y = (SCREEN_HEIGHT / 4) * 3.5;
        this.insertCoin.x = (SCREEN_WIDTH / 2) - (this.insertCoin.width / 2) - 100;

        // score
        this.score = new Text(scene2d, '000000', 48);
        this.score.x = 80;
        this.score.y = 10;

        const changeStarVector = () => {
            const angle = randomf(0, Math.PI * 2);
            this.starVector = new Vector2(Math.cos(angle), Math.sin(angle)).scale(30, 30);
        }

        // timers
        this.timers = new Timers();

        this.timers.add({ seconds: .5}, () => {
            this.insertCoin.visible = !this.insertCoin.visible;
        });

        this.timers.add({ seconds: 10}, () => {
            changeStarVector();
        });

        this.timers.add({delay: 2, seconds: 20}, () => {
            rumble.play();
        });

        this.timers.add({delay: 6, seconds: 10}, () => {
            fx1.play();
        });

        this.timers.add({delay: 8, seconds: 10}, () => {
            fx2.play();
        });

        // stars!
        this.starField = new StarField(this.worldWidth, this.worldHeight);
        changeStarVector();

        // 2d camera
        this.camera2d = new Camera(this.worldWidth / 2, this.worldHeight / 2, SCREEN_WIDTH, SCREEN_HEIGHT, this.worldWidth, this.worldHeight);    
    }
    
    destroy() {
        //this.graphics.clear();
        this.graphics.destroy();
        this.title3d.destroy();

        while (scene2d.children.length) {
            scene2d.removeChild(scene2d.children[0]);
        }

        while(scene3d.children.length > 0){
            scene3d.remove(scene3d.children[0]); 
        }
    }

    update(dt: number) {
        this.timers.update(dt);
        
        this.time++;
        
        if (this.time > 100) {
            this.time = 0;
        }

        filter.uniforms.time = this.time * 0.5;
        
        this.title3d.update(dt);

        this.starField.move(this.starVector.x, this.starVector.y);

        if (Key.any()) {
            
            this.destroy();
            Bus.send('ATTRACT_MODE_END');
        }
    }

    render(dt?: number) {
        const all = [...this.starField.stars];
        
        // hide all objects
        all.forEach(obj => obj.visible = false);

        // what can the camera see?
        const visible: Object2D[] = this.camera2d.translateToScreen(all);
        
        // show visible objects
        visible.forEach(obj => obj.visible = true);

        canvas3d.render(scene3d, camera3d);
        
        this.titleSprite3d.texture.update(); //tell pixi that threejs changed
        
        canvas2d.render(scene2d);
        
        Key.reset();
    }
}