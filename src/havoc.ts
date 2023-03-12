/// <reference types="./havoc" />
import { loop, Bus, Key } from '@/utilities';
import { GameScene } from './scenes/game/gameScene';
import { AttractScene } from './scenes/attract/attractScene';

class Havoc implements UpdateRender {

    private state: UpdateRender;

    constructor() {
        this.init();
    }

    init() {
        this.state = new AttractScene();

        Bus.subscribe('ATTRACT_MODE_END', ()=> {
            this.state = new GameScene();
        });
    }

    update(dt: number) {
        this.state.update(dt);
    }

    render(dt?: number) {
        this.state.render(dt);
        Key.reset();
    }

}

const havoc = new Havoc();

setTimeout(() => {
   loop(havoc);
}, 1000);