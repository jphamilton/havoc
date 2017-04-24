export function random(start, end) {
     return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function randomf(start, end) {
    return Math.random() * (end - start) + start;
}

export function random_array<T>(array: T[]) {
    return array[random(0, array.length - 1)];
}

export function wrap(worldWidth: number, worldHeight: number, ...args: ISprite[]) {
    
    args.forEach(o => {
        if (o.world.x > worldWidth) {
            o.world.x -= worldWidth;
        }

        if (o.world.x < 0) {
            o.world.x += worldWidth;
        }

        if (o.world.y > worldHeight) {
            o.world.y -= worldHeight;
        }

        if (o.world.y < 0) {
            o.world.y += worldHeight;
        }
    });
}

export function lerp(current: number, target: number, amount: number) {
    return (target - current) * amount;
}