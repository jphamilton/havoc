// taken from https://github.com/felixturner/bad-tv-shader

export const Shader = {

    uniforms: {
        grayscale: {
            type: 'b',
            value: false
        },

        nIntensity: {
            type: '1f',
            value: 0.4
        },

        sCount: {
            type: 'i',
            value: 800
        },

        sIntensity: {
            type: '1f',
            value: 0.9
        },

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
        // control parameter
        uniform float time;

        uniform bool grayscale;

        // noise effect intensity value (0 = no effect, 1 = full effect)
        uniform float nIntensity;

        // scanlines effect intensity value (0 = no effect, 1 = full effect)
        uniform float sIntensity;

        // scanlines effect count value (0 = no effect, 4096 = full effect)
        uniform float sCount;

        uniform sampler2D uSampler;

        varying vec2 vUv;

        void main() {

            // sample the source
            vec4 cTextureScreen = texture2D( uSampler, vUv );

            // make some noise
            float x = vUv.x * vUv.y * time *  1000.0;
            x = mod( x, 13.0 ) * mod( x, 123.0 );
            float dx = mod( x, 0.01 );

            // add noise
            vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );

            // get us a sine and cosine
            vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );

            // add scanlines
            cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;

            // interpolate between source and result by intensity
            cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );

            // convert to grayscale if desired
            if( grayscale ) {
                cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );
            }

            gl_FragColor =  vec4( cResult, cTextureScreen.a );
        }
    `
}