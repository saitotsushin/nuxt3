uniform sampler2D uTexture;
varying vec2 vUv;
uniform vec2 u_resolution;
uniform float uTime;
uniform float u_glitchAmount;

float noise(vec2 st) {
    // return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
  
void main(void){
    // フラグメントの正規化座標を計算
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // テクスチャの色をサンプリング
    vec4 texColor = texture2D(uTexture, st);
    
    float glitch = step(0.75, fract(uTime * 2.0));

    // ノイズによる位置のシフトを加える（グリッチ効果）
    vec2 glitchShift = vec2(noise(st + uTime) * 0.1, 0.0); // x方向にずらす
    vec4 glitchColor = texture2D(uTexture, st + glitchShift * glitch * u_glitchAmount);

    // テクスチャカラーとグリッチカラーを合成
    vec4 finalColor = mix(texColor, glitchColor, glitch);

    // 出力
    gl_FragColor = glitchColor;
    // シンプルなノイズ関数
    // gl_FragColor = color;

}