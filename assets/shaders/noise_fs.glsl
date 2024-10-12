uniform sampler2D uTexture;
varying vec2 vUv;
// uniform float uPos;
uniform float uTime;
  
void main(void){
    vec4 color = texture2D(uTexture, vUv);

    gl_FragColor = LinearTosRGB(color);
}