
/* lookup tables */

const RAD: { [degree: number]: number} = {};
const COS: { [degree: number]: number} = {};
const SIN: { [degree: number]: number} = {};
const VECTOR: { [degree: number]: Point} = {};

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

