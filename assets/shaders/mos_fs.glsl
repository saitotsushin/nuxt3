uniform sampler2D uTexture;
varying vec2 vUv;
// uniform float uPos;
uniform float uTime;
  
void main(void){
    vec4 color = texture2D(uTexture, vUv);
   
    // グレースケールフィルター
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    gl_FragColor = vec4(vec3(gray), color.a);
    // gl_FragColor = color;
}