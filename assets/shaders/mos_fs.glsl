uniform sampler2D uTexture;
varying vec2 vUv;
// uniform float uPos;
uniform float uPercent;
uniform float uTime;
  
void main(void){
    // 1.シンプルに出力
    // vec4 color = texture2D(uTexture, vUv);
    // gl_FragColor = LinearTosRGB(vec4( color, 1.0 ));
    
    // 2.グレースケールフィルター
    // float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    // gl_FragColor = LinearTosRGB(vec4(vec3(gray), color.a));

    vec2 uv = vUv;

    float moz = uPercent * 0.02;

    if( moz > 0. ) {// 0では割れないので、if文で保護
        uv = floor( uv / moz ) * moz + ( moz * .5 );
    }
    vec4 texColor = texture2D( uTexture, uv );
    // アルファ値が 0 の場合はスキップ
    if (texColor.a < 0.5) {
        discard;
    }
    vec3 color = texColor.rgb;

    gl_FragColor = LinearTosRGB(vec4( color, 1.0 ));

}