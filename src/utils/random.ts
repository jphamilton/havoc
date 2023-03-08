export function random(start: number, end: number) {
     return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function randomf(start: number, end: number) {
    return Math.random() * (end - start) + start;
}

export function random_array<T>(array: T[]) {
    return array[random(0, array.length - 1)];
}