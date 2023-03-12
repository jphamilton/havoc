import { Key } from '@/utilities';
import { World } from './world';


export class GameScene implements UpdateRender {

    world: World;
    paused: boolean = false;

    constructor() {
        this.world = new World();
    }

    update(dt: number) {
        if (Key.isPressed(Key.PAUSE)) {
            this.paused = !this.paused;
        }

        if (this.paused) {
            return;
        }

        this.world.update(dt);
    }

    render(dt?: number) {
        this.world.render(dt);
    }

}