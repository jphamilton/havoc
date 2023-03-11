export const Shader = {

    uniforms: {
        amount: {
            type: '1f',
            value: 0.0099
        },
        angle: {
            type: '1f',
            value: .1
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
        uniform float amount;
        uniform float angle;

        varying vec2 vUv;

        void main() {
            vec2 offset = amount * vec2( cos(angle), sin(angle));
            vec4 cr = texture2D(uSampler, vUv + offset);
            vec4 cga = texture2D(uSampler, vUv);
            vec4 cb = texture2D(uSampler, vUv - offset);
            gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
        }
    `
}