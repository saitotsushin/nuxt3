uniform sampler2D uTexture;
varying vec2 vUv;
// uniform float uPos;
uniform float uTime;
  
void main(void){
    vec4 color = texture2D(uTexture, vUv);
    
    // RGBからグレースケールへの変換
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayscale = vec3(gray);

    // エフェクトの進行具合に応じて白黒に変わる
    // エフェクトの強さをY座標に基づいて設定
    // vUv.y は0.0が画面の下、1.0が画面の上を表すので、逆にする
    float gradient = mix(0.0, 1.0, vUv.y - uTime);
    vec3 finalColor = mix(color.rgb,grayscale,gradient);

//    gl_FragColor = vec4(finalColor, color.a);

    gl_FragColor = vec4(finalColor, color.a);
}