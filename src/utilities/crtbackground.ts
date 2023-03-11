import { Graphics } from 'pixi.js';

export const CrtBackground = (graphics: Graphics) => {

    graphics.beginFill(0x001111, 0.4);
    graphics.drawRect(0, 0, screen.width, screen.height);
    graphics.endFill();


}