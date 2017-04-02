
/* lookup tables */

const RAD = {};
const COS = {};
const SIN = {};
const VECTOR = {};

const PI2 = 2 * Math.PI;
const r = Math.PI / 180;

for(let i = 0; i <= 360; i++) {
    const t = PI2 * (i / 360);

    RAD[i] = i * r; 
    COS[i] = Math.cos(RAD[i]);
    SIN[i] = Math.sin(RAD[i]);

    VECTOR[i] = {
        x: Math.cos(t),
        y: Math.sin(t)
    };

    RAD[-i] = -i * r; 
    COS[-i] = Math.cos(RAD[-i]);
    SIN[-i] = Math.sin(RAD[-i]);

}

export { RAD, COS, SIN, VECTOR } 

