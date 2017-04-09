export function random(start, end) {
     return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function randomf(start, end) {
    return Math.random() * (end - start) + start;
}