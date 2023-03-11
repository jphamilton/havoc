import * as PIXI from 'pixi.js';
import { canvas2d, scene2d, filter , SCREEN_WIDTH, SCREEN_HEIGHT } from '../../2d';
import { canvas3d, scene3d, camera3d } from './3d';
import { Title3d } from './title3d';
import { Camera } from '../game/camera';
import { StarField } from '../../starfield';
import { randomf, Bus, CrtBackground, Key, Text, Timers, Vector2 } from '@/utilities';
import { fx1, fx2, rumble } from '../../sounds';


let score: Text;
let title3d: Title3d;
let graphics: PIXI.Graphics;
let insertCoin: Text;
let timers: Timers;
let camera2d: Camera;
let time: number = 0;

let worldWidth: number;
let worldHeight: number;
let starField: StarField;
let starVector: Vector2;

export class AttractState implements UpdateRender {
    
    constructor() {
        this.init();
    }

    private init() {
        worldWidth = SCREEN_WIDTH * 4;
        worldHeight = SCREEN_HEIGHT * 4;

        title3d = new Title3d(scene2d);

        // background
        graphics = new PIXI.Graphics();
        CrtBackground(graphics);
        scene2d.addChild(graphics);

        // push start
        insertCoin = new Text(scene2d, 'I N S E R T  C O I N', 64);
        insertCoin.y = (SCREEN_HEIGHT / 4) * 3.5;
        insertCoin.x = (SCREEN_WIDTH / 2) - (insertCoin.width / 2) - 100;

        // score
        score = new Text(scene2d, '000000', 48);
        score.x = 80;
        score.y = 10;

        const changeStarVector = () => {
            const angle = randomf(0, Math.PI * 2);
            starVector = new Vector2(Math.cos(angle), Math.sin(angle)).scale(30, 30);
        }

        // timers
        timers = new Timers();

        timers.add({ seconds: .5}, () => {
            insertCoin.visible = !insertCoin.visible;
        });

        timers.add({ seconds: 10}, () => {
            changeStarVector();
        });

        timers.add({delay: 2, seconds: 20}, () => {
            rumble.play();
        });

        timers.add({delay: 6, seconds: 10}, () => {
            fx1.play();
        });

        timers.add({delay: 8, seconds: 10}, () => {
            fx2.play();
        });

        // stars!
        starField = new StarField(worldWidth, worldHeight);
        changeStarVector();

        // 2d camera
        camera2d = new Camera(worldWidth / 2, worldHeight / 2, SCREEN_WIDTH, SCREEN_HEIGHT, worldWidth, worldHeight);    
    }
    
    destroy() {
        //graphics.clear();
        graphics.destroy();
        title3d.destroy();

        while (scene2d.children.length) {
            scene2d.removeChild(scene2d.children[0]);
        }

        while(scene3d.children.length > 0){
            scene3d.remove(scene3d.children[0]); 
        }
    }

    update(dt: number) {
        timers.update(dt);
        
        time++;
        
        if (time > 100) {
            time = 0;
        }

        filter.uniforms.time = time * 0.5;
        
        title3d.update(dt);

        starField.move(starVector.x, starVector.y);

        if (Key.any()) {
            
            this.destroy();
            Bus.send('ATTRACT_MODE_END');
        }
    }

    render(dt?: number) {
        const all = [...starField.stars];
        
        // hide all objects
        all.forEach(obj => obj.visible = false);

        // what can the camera see?
        const visible: Object2D[] = camera2d.translateToScreen(all);
        
        // show visible objects
        visible.forEach(obj => obj.visible = true);

        canvas3d.render(scene3d, camera3d);
        
        title3d.render(dt);

        canvas2d.render(scene2d);
        
        Key.reset();
    }
}