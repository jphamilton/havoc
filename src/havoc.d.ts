interface UpdateOnly {
    update: (step: number) => void;
}

interface UpdateRender extends UpdateOnly {
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

interface Object2D {
    x: number;
    y: number;
    visible: boolean;
    world: Point;
}
