import screen from './screen';
import * as PIXI from 'pixi.js';

export class Score {

    private score1: PIXI.Text;
    private score2: PIXI.Text;

    constructor() {

        this.score1 = new PIXI.Text('000000', {
            fontWeight: 'bold',
            fontFamily : 'Hyperspace', 
            fontSize: 48, 
            fill : 0x00FFFF, 
            align : 'right'}
        );

        this.score1.alpha = .1;
        
        this.score2 = new PIXI.Text('000000', {
            fontWeight: 'bold',
            fontFamily : 'Hyperspace', 
            fontSize: 48, 
            fill : 0xFFFFFF, 
            align : 'right'}
        );

        this.score2.alpha = .15;
        
        screen.stage.addChild(this.score1);
        screen.stage.addChild(this.score2);
    }

    get x(): number {
        return this.score1.x;
    }

    set x(value: number) {
        this.score1.x = value;
        this.score2.x = value + 2;
    }

    get y(): number {
        return this.score1.y;
    }

    set y(value: number) {
        this.score1.y = value;
        this.score2.y = value + 2;
    }
}