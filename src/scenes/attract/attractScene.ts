import { canvas2d, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../2d';
import { canvas3d, scene3d, camera3d } from './3d';
import { Title3d } from './title3d';
import { Camera2D } from '../game/camera2d';
import { StarField } from '../../starfield';
import { randomf, Bus, HavocScene, Key, Text, Timers, Vector2 } from '@/utilities';
import { fx1, fx2, rumble } from '../../sounds';


let scene: HavocScene;
let score: Text;
let title3d: Title3d;
let insertCoin: Text;
let timers: Timers;
let camera2d: Camera2D;
let time: number = 0;

let worldWidth: number;
let worldHeight: number;
let starField: StarField;
let starVector: Vector2;

const changeStarVector = () => {
    const angle = randomf(0, Math.PI * 2);
    starVector = new Vector2(Math.cos(angle), Math.sin(angle)).scale(30, 30);
}

export class AttractScene implements UpdateRender {
    
    constructor() {
        this.init();
    }

    private init() {
        worldWidth = SCREEN_WIDTH * 4;
        worldHeight = SCREEN_HEIGHT * 4;

        scene = new HavocScene();

        title3d = new Title3d(scene);

        // push start
        insertCoin = new Text(scene, 'I N S E R T  C O I N', 64);
        insertCoin.y = (SCREEN_HEIGHT / 4) * 3.5;
        insertCoin.x = (SCREEN_WIDTH / 2) - (insertCoin.width / 2);

        // score
        score = new Text(scene, '000000', 48);
        score.x = 80;
        score.y = 10;

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
        starField = new StarField(scene, worldWidth, worldHeight);
        changeStarVector();

        // 2d camera
        camera2d = new Camera2D(worldWidth / 2, worldHeight / 2, SCREEN_WIDTH, SCREEN_HEIGHT, worldWidth, worldHeight);    
    }
    
    destroy() {
        title3d.destroy();

        scene.destroy();
        
        while(scene3d.children.length > 0){
            scene3d.remove(scene3d.children[0]); 
        }
    }

    update(dt: number) {
        timers.update(dt);
        
        scene.update(dt);
        
        title3d.update(dt);

        starField.move(starVector.x, starVector.y);

        if (Key.any()) {
            
            this.destroy();
            Bus.send('ATTRACT_MODE_END');
        }
    }

    render(dt?: number) {
        const all = [...starField.all];
        
        // hide all objects
        all.forEach(obj => obj.visible = false);

        // what can the camera see?
        const visible: Object2D[] = camera2d.translateToScreen(all);
        
        // show visible objects
        visible.forEach(obj => obj.visible = true);

        canvas3d.render(scene3d, camera3d);
        
        title3d.render(dt);

        canvas2d.render(scene);
        
        Key.reset();
    }
}