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