uniform sampler2D uTexture;
varying vec2 vUv;
uniform vec2 u_resolution;
uniform float uTime;
uniform float u_glitchAmount;

// ノイズ生成関数（擬似ランダム値）
float random(float x) {
    return fract(sin(x) * 43758.5453123);
}
float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
  
void main(void){

    // フラグメントの正規化座標（0.0〜1.0の範囲）
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // テクスチャの色をサンプリング
    vec4 texColor = texture2D(uTexture, uv);
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float n = noise(st * u_resolution.xy + uTime);
    // ノイズを色に適用
    vec3 noiseColor = vec3(n * u_glitchAmount) + vec3(texColor);
    
    // 線のパラメータ
    // ランダムな線の太さを 0.01〜0.02 に設定
    float randValue = random(uv.x);           // ランダムな値を生成
    float lineWidth = mix(0.005, 0.01, randValue);  // 0.01 〜 0.02 の間でランダムに設定


    float speed = 0.5;       // 線の下方向への速度

    // uTimeに基づいてY座標を移動させる
    float lineY = fract(uv.y - uTime * speed);  // 時間で下に移動する線

    // Y座標に基づいて線を描く
    float line = step(1.0 - lineWidth, abs(lineY));

    // 線の色とテクスチャの色を合成
    vec4 lineColor = vec4(1.0, 1.0, 0.0, 1.0); // 赤い線
    // 減算合成: テクスチャの色から線の色を減算
    // vec4 finalColor = texColor - lineColor * line;    

    // 減算合成: テクスチャの色から線の色を減算
    vec4 finalColor = vec4(noiseColor,1.0) - lineColor * line;

    // vec4 finalColor = mix(texColor, lineColor, line);
    if (texColor.a < 0.5) {
        discard;
    }
    // 出力
    gl_FragColor = finalColor;

}