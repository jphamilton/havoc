

export class Sprite extends PIXI.Sprite implements ISprite {

    world: Point;

    constructor(x: number, y: number, image: string) {
        super(PIXI.Texture.fromImage(image));

        this.anchor.set(0.5);

        this.world = { x, y };
    }
}