interface UpdateOnly {
    update: (delta: number) => void;
}

interface UpdateRender extends UpdateOnly {
    render: (delta?: number) => void;
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

interface Object2D extends Point {
    visible: boolean;
    world: Point;
}
