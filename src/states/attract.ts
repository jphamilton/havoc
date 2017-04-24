import { Key } from '../keys';
import Bus from '../bus';
import { canvas2d, scene2d, SCREEN_WIDTH, SCREEN_HEIGHT } from '../2d';
import { canvas3d, scene3d, camera3d } from '../3d';
import { Title3d } from '../title3d';
import { Shader } from '../shaders/0x0D';
import { Camera } from '../camera';
import { Background } from '../background';
import { StarField } from '../starfield';
import { Text } from '../text';
import { Vector2 } from '../vector2';
import { randomf } from '../util';
import { rumble } from '../sounds';

interface TimerOptions {
    seconds: number;
    delay?: number;
    repeat?: boolean;
}

class Timers {
    private timers: Timer[] = [];

    add(options: TimerOptions, cb: () => void) {
        const timer = new Timer(options);
        timer.on(cb);
        this.timers.push(timer);
    }

    update(dt: number) {
        this.timers.forEach(timer => timer.update(dt));
    }
}

class Timer {
    
    private repeat: boolean;
    private time: number = 0;
    private delay: number;
    private delayTime: number = 0;
    private seconds: number;
    private triggered: boolean;
    private cb: () => void;

    constructor(options: TimerOptions) {
        this.seconds = options.seconds;
        this.repeat = options.repeat !== undefined ? options.repeat : true;
        this.delay = options.delay !== undefined ? options.delay : 0;
    }

    update(dt: number) {
        if (this.triggered) {
            return;
        }

        if (this.delay && this.delayTime < this.delay) {
            this.delayTime += dt;
            if (this.delayTime > this.delay) {
                this.cb();
            }
            return;
        }

        this.time += dt;

        if (this.time >= this.seconds) {
            this.time = 0;
            this.cb();

            if (!this.repeat) {
                this.triggered = true;
            }
        } 
    }

    on(cb: () => void) {
        this.cb = cb;
    }
}

export class AttractState implements IUpdateRender {
    private background: Background;
    private score: Text;
    private title3d: Title3d;
    private texture3d: PIXI.Texture;
    private sprite3d: PIXI.Sprite;
    private graphics: PIXI.Graphics;
    private filter: PIXI.Filter;
    private pushStart: Text;
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
        
        this.texture3d = PIXI.Texture.fromCanvas(canvas3d.domElement);
        this.sprite3d = new PIXI.Sprite(this.texture3d);
        scene2d.addChild(this.sprite3d);

        // background
        this.graphics = new PIXI.Graphics();
        this.graphics.clear();
        scene2d.addChild(this.graphics);
        this.background = new Background(this.graphics, 0x001111, .2);

        // shader
        this.filter = new PIXI.Filter(Shader.vertex, Shader.fragment, Shader.uniforms);
        scene2d.filters = [this.filter];

        // score
        this.score = new Text('000000', 48);
        this.score.x = 80;
        this.score.y = 10;

        // push start
        this.pushStart = new Text('PUSH START', 64);
        this.pushStart.y = (SCREEN_HEIGHT / 4) * 3;
        this.pushStart.x = (SCREEN_WIDTH / 2) - (this.pushStart.width / 2);
        
        const changeStarVector = () => {
            const angle = randomf(0, Math.PI * 2);
            this.starVector = new Vector2(Math.cos(angle), Math.sin(angle)).scale(30, 30);
        }

        // timers
        this.timers = new Timers();

        this.timers.add({ seconds: .5}, () => {
            this.pushStart.visible = !this.pushStart.visible;
        });

        this.timers.add({ seconds: 5}, () => {
            changeStarVector();
        });

        this.timers.add({delay: 2, seconds: 10}, () => {
            rumble.play();
        });

        // stars!
        this.starField = new StarField(this.worldWidth, this.worldHeight);
        changeStarVector();

        // 2d camera
        this.camera2d = new Camera(this.worldWidth / 2, this.worldHeight / 2, SCREEN_WIDTH, SCREEN_HEIGHT, this.worldWidth, this.worldHeight);    
    }
    
    update(dt: number) {
        this.timers.update(dt);
        
        this.time++;
        this.filter.uniforms.time = this.time * 0.5;
        this.title3d.update(dt);

        this.starField.move(this.starVector.x, this.starVector.y);

        if (Key.any()) {
            
            this.graphics.clear();

            this.title3d.destroy();

            while (scene2d.children.length) {
                scene2d.removeChild(scene2d.children[0]);
            }
            
            scene2d.filters = [];
            
            Bus.send('ATTRACT_MODE_END');
        }
    }

    render(dt: number) {
        const all = [...this.starField.stars];
        
        // hide all objects
        all.forEach(obj => obj.visible = false);

        // what can the camera see?
        const visible: ISprite[] = this.camera2d.translateToScreen(all);
        
        // show visible objects
        visible.forEach(obj => obj.visible = true);

        canvas3d.render(scene3d, camera3d);
        this.sprite3d.texture.update(); //tell pixi that threejs changed
        canvas2d.render(scene2d);
        
        Key.reset();
    }
}