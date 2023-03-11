/// <reference types="./havoc" />
import { loop, Bus, Key } from '@/utilities';
import { GameState } from './scenes/game/game';
import { AttractState } from './scenes/attract/attract';

class Havoc implements UpdateRender {

    private state: UpdateRender;

    constructor() {
        this.init();
    }

    init() {
        this.state = new AttractState();

        Bus.subscribe('ATTRACT_MODE_END', ()=> {
            this.state = new GameState();
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