const LEN = 222;

export class _Key {

    keys: boolean[];
    prev: boolean[];

    HYPERSPACE = 32; 
    LEFT = 37;
    RIGHT = 39;
    UP = 38;
    FIRE = 17;   
    PLAYER_ONE_START = 49;    
    DEBUG = 68;  
    PAUSE = 80;
    GOD = 71;
    MONITOR_BURN = 66;
    DOWN = 40;

    constructor() {
        this.keys = new Array(LEN);
        this.prev = new Array(LEN);

        for (let i = 0; i < LEN; i++) {
            this.keys[i] = this.prev[i] = false;
        }

        window.onkeydown = (e) => {
            this.keys[e.keyCode] = true;
        }

        window.onkeyup = (e) => {
            this.keys[e.keyCode] = false;
        }
    }

    update() {
        for (let i = 0; i < LEN; i++) {
            this.prev[i] = this.keys[i];
        }
    }

    isPressed(key) {
        return this.prev[key] === false && this.keys[key] === true;
    }

    wasPressed(key) {
        return this.prev[key] && !this.keys[key];
    }

    isDown(key) {
        return this.keys[key];
    }
}

export const Key = new _Key();

