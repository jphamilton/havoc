import { loop } from './loop';
import Bus from './bus';
import { Key } from './keys';
import { GameState } from './states/game';
import { AttractState } from './states/attract';

class Havoc implements IUpdateRender {

    private state: IUpdateRender;

    constructor() {
        this.init();
    }

    init() {
        this.state = new AttractState();
    }

    update(dt: number) {
        this.state.update(dt);
    }

    render(dt: number) {
        this.state.render(dt);
        Key.reset();
    }

}

const game = new Havoc();

setTimeout(() => {
    loop(game);
}, 1000);