import { Howl } from 'howler';

const fx1 = new Howl({
    src: ['./assets/fx1.wav'],
    volume: .5,
    preload: true
});

const fx2 = new Howl({
    src: ['./assets/fx2.wav'],
    volume: .5,
    preload: true
});

const rumble = new Howl({
    src: ['./assets/8bitrumble.wav'],
    volume: 1,
    preload: true
});


export { fx1, fx2, rumble };


