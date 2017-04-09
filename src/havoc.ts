import { loop } from './loop';
import Bus from './bus';
import { Key } from './keys';
import { TestState } from './teststate';

class Havoc implements IUpdateRender {

    private state: IUpdateRender;

    constructor() {
        this.init();
    }

    init() {
        this.state = new TestState();
    }

    update(dt: number) {
        this.state.update(dt);
    }

    render(dt: number) {
        this.state.render(dt);
        Key.update();
    }

}

const game = new Havoc();

setTimeout(() => {
    loop(game);
}, 1000);