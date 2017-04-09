// based on https://github.com/Blokatt/0x0D

export const Shader = {

    uniforms: {
        time: {
            type: '1f',
            value: 0.0
        }
    },

    vertex: `
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        
        varying vec2 vUv;
        uniform mat3 projectionMatrix;
        
        void main(void)
        {
            gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.);
            vUv = aTextureCoord;
        }
    `,

    fragment: `
        uniform sampler2D uSampler;
        uniform float time;
        
        varying vec2 vUv;
        
        float fadeX = 255.; //16. * .2;
        float fadeY = 255.; //16. * .2;
        const float pW = .0015625;
        const float pH = .0027;
        const float tPi = 6.28318530718;
        const int blurSize = 2;

        void main() {
            
            vec2 coords = vUv; 
            float dist = distance(coords, vec2(.5, .5));
            vec4 color = texture2D(uSampler, vec2(coords.x, coords.y));

            vec4 col2;
            col2 = color * (1. + sin(mod(coords.y * 50. - time * 2., tPi)) * .1) * color;  

            vec4 boxBlur = vec4(0., 0., 0., 0.);
            for (int _y = -blurSize; _y <= blurSize; _y++) {
                for (int _x = -blurSize; _x <= blurSize; _x++){
                    boxBlur += texture2D(uSampler, vec2(coords.x + float(_x) * pW, coords.y + float(_y) * pH)) * .2;
                }
            }

            col2 = ((col2 * 25. + boxBlur * (.8 - .05 * sin(time))) * (1. - min(.4, (((sin(coords.y * 1800.) / 1.4) + 1.) / 5.)) - min(1., dist / 1.6)));           
            gl_FragColor = col2 * ((min(coords.y * fadeY, 1.)) * min(coords.x * fadeX, 1.) * (min((1. * fadeX) - coords.x * fadeX , 1.)) * (min((1. * fadeY) - coords.y * fadeY , 1.))); 
        }
    `
}