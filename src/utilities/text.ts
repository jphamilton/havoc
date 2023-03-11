import * as PIXI from 'pixi.js';

export class Text {

    private text1: PIXI.Text;
    private text2: PIXI.Text;
    private style: Partial<PIXI.TextStyle>;
    
    constructor(scene: PIXI.Container, private text: string, private fontSize: number) {

        this.style = {
            fontWeight: 'bold',
            fontFamily : 'hyperspace', 
            fill : 0x00FFFF, 
            align : 'left',
            fontSize,
        };

        this.text1 = new PIXI.Text(text, this.style);
        this.text1.alpha = .1;
        this.text1.style = this.style;

        scene.addChild(this.text1);
        
        this.text2 = new PIXI.Text(text, this.style);
        this.text2.alpha = .1;
        this.text1.style = this.style;

        scene.addChild(this.text2);
    }

    get x(): number {
        return this.text1.x;
    }

    set x(value: number) {
        this.text1.x = value;
        this.text2.x = value + 2;
    }

    get y(): number {
        return this.text1.y;
    }

    set y(value: number) {
        this.text1.y = value;
        this.text2.y = value + 2;
    }

    get visible(): boolean {
        return this.text1.visible;
    }

    set visible(value: boolean) {
        this.text1.visible = value;
        this.text2.visible = value;
    }

    get width(): number {
        return this.text1.width;
    }

    destroy() {
        this.text1.destroy();
        this.text2.destroy();
    }
}