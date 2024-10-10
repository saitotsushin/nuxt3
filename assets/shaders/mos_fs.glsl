uniform sampler2D uTexture;
varying vec2 vUv;
// uniform float uPos;
uniform float uPercent;
uniform float uTime;
  
void main(void){
    // vec4 color = texture2D(uTexture, vUv);
    vec2 uv = vUv;

    float moz = uPercent * 0.02;

    if( moz > 0. ) {// 0では割れないので、if文で保護
        uv = floor( uv / moz ) * moz + ( moz * .5 );
    }

    vec3 color = texture2D( uTexture, uv ).rgb;

    gl_FragColor = LinearTosRGB(vec4( color, 1.0 ));

    // // グレースケールフィルター
    // float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    // // gl_FragColor = vec4(vec3(gray), color.a);
    // gl_FragColor = LinearTosRGB(vec4(vec3(gray), color.a));
}