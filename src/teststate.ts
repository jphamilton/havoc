import { Key } from './keys';
import { World } from './world';
import screen from './screen';

export class TestState implements IUpdateRender {

    world: World;
    paused: boolean = false;

    constructor() {
        this.world = new World(screen.width * 3, screen.height * 3);
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

    render(dt: number) {
        this.world.render(dt);
    }

}