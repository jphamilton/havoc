export function random(start, end) {
     return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function randomf(start, end) {
    return Math.random() * (end - start) + start;
}

export function random_array<T>(array: T[]) {
    return array[random(0, array.length - 1)];
}