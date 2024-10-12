uniform sampler2D uTexture;
varying vec2 vUv;
uniform vec2 u_resolution;
uniform float uTime;
uniform float u_glitchAmount;

float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
  
void main(void){
    vec4 color = texture2D(uTexture, vUv);

    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float n = noise(st * u_resolution.xy + uTime);
    // ノイズを色に適用
    vec3 noiseColor = vec3(n * u_glitchAmount) + vec3(color);
    if (color.a < 0.5) {
        discard;
    }
    gl_FragColor = vec4(noiseColor, 1.0);
    // シンプルなノイズ関数
    // gl_FragColor = color;

}