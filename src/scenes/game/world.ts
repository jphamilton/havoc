import { canvas2d, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../2d';
import { lerp, Bus, HavocScene, Text } from '@/utilities';
import { Camera2D } from './camera2d';
import { Asteroids } from './asteroids';
import { StarField } from '../../starfield';
import { Ship } from './ship';
import { ShipBullet } from './shipbullet';
import { HUD } from './hud';

let scene: HavocScene;
let camera: Camera2D;    
let asteroids: Asteroids;
let ship: Ship;
let shipBullets: ShipBullet[] = [];
let score: Text;
let starField: StarField;
let hud: HUD;
let width: number;
let height: number;

export class World implements UpdateRender, Rect {
   
    private time: number = 0;

    constructor() {
        width = SCREEN_WIDTH * 4;
        height = SCREEN_HEIGHT * 4;

        scene = new HavocScene();
        
        // create ship at the center of the world
        ship = new Ship(scene, width / 2, height / 2, width, height);

        // stars!
        starField = new StarField(scene, width, height);

        // asteroids!
        asteroids = new Asteroids(scene, width, height);

        // score
        score = new Text(scene, '000000', 48);
        score.x = 80;
        score.y = 10;

        // heads up display
        hud = new HUD(scene.graphics, width, height);

        camera = new Camera2D(ship.world.x, ship.world.y, SCREEN_WIDTH, SCREEN_HEIGHT, width, height);    
        
        // subscribe to messages
        Bus.subscribe(Bus.Messages.ShipBulletFired, (bullet:ShipBullet) => {
            shipBullets.push(bullet);
            scene.addChild(bullet);
        });

        Bus.subscribe(Bus.Messages.ShipBulletExpired, (bullet: ShipBullet) => {
            shipBullets = shipBullets.filter(x => x !== bullet);
            scene.removeChild(bullet);
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
        return width;
    }

    get bottom() {
        return height;
    }

    update(dt: number) {
        scene.update(dt);

        // move objects and stuff around the world here
        ship.update(dt);
        shipBullets.forEach(bullet => bullet.update(dt));
        asteroids.update(dt);

        // wrap ship if necessary
        if (ship.world.x > width) {
            ship.world.x -= width;
            camera.x -= width;
        }

        if (ship.world.x < 0) {
            ship.world.x += width;
            camera.x += width;
        }

        if (ship.world.y > height) {
            ship.world.y -= height;
            camera.y -= height;
        }

        if (ship.world.y < 0) {
            ship.world.y += height;
            camera.y += height;
        }

        
        const delta = camera.follow(ship.world.x, ship.world.y, lerp);

        starField.move(delta.x, delta.y);
    }

    render(dt?: number) {
        // this is just to draw HUD, must be a better way.
        scene.clearBackground();
        hud.update();
        hud.track(ship, 0x00FFFF, .5);
        
        const all = [ship,...shipBullets, ...starField.all, ...asteroids.all];
        
        // hide all objects
        all.forEach(obj => obj.visible = false);

        // what can the camera see?
        const visible: Object2D[] = camera.translateToScreen(all);
        
        // show visible objects
        visible.forEach(obj => obj.visible = true);

        asteroids.all.forEach(a => hud.track(a, 0x00FFFF, .3));

        canvas2d.render(scene);
    }

    
}