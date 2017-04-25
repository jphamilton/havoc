import { scene2d } from './2d';
import * as PIXI from 'pixi.js';

export class Text {

    private text1: PIXI.Text;
    private text2: PIXI.Text;

    constructor(private text: string, private fontSize: number) {

        this.text1 = new PIXI.Text(this.text, {
            fontWeight: 'bold',
            fontFamily : 'Hyperspace', 
            fontSize: this.fontSize, 
            fill : 0x00FFFF, 
            align : 'left'}
        );

        this.text1.alpha = .1;
        
        this.text2 = new PIXI.Text(this.text, {
            fontWeight: 'bold',
            fontFamily : 'Hyperspace', 
            fontSize: this.fontSize, 
            fill : 0x00FFFF, 
            align : 'left'}
        );

        this.text2.alpha = .1;
        
        scene2d.addChild(this.text1);
        scene2d.addChild(this.text2);
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
}