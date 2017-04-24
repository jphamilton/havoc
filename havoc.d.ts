interface IUpdate {
    update: (step: number) => void;
}

interface IUpdateRender extends IUpdate {
    render: (dt?: number) => void;
}

interface Point {
    x: number,
    y: number
}

interface Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

interface IVector2 {
    x: number;
    y: number;
    dot(vector: IVector2): number;
    magnitude: number;
    unit: IVector2;
}

interface IWorld {
    world: Point;
}


interface ISprite extends IWorld {
    x: number;
    y: number;
    visible: boolean;
}