  uniform sampler2D uTexture;
  varying vec2 vUv;
  uniform float uPos;
  uniform float uTime;
// 10色を定義
vec3 palette[54] = vec3[](    
vec3(0.47, 0.47, 0.47),
vec3(0.13, 0.00, 0.69),
vec3(0.16, 0.00, 0.72),
vec3(0.38, 0.06, 0.63),
vec3(0.60, 0.13, 0.47),
vec3(0.69, 0.06, 0.19),
vec3(0.63, 0.19, 0.00),
vec3(0.47, 0.25, 0.00),
vec3(0.28, 0.35, 0.00),
vec3(0.22, 0.41, 0.00),

vec3(0.22, 0.42, 0.00),
vec3(0.19, 0.38, 0.25),
vec3(0.19, 0.31, 0.50),
vec3(0.69, 0.69, 0.69),
vec3(0.25, 0.38, 0.97),
vec3(0.25, 0.25, 1.00),
vec3(0.56, 0.25, 0.94),
vec3(0.85, 0.25, 0.75),
vec3(0.85, 0.25, 0.38),
vec3(0.88, 0.31, 0.00),

vec3(0.75, 0.44, 0.00),
vec3(0.53, 0.53, 0.00),
vec3(0.31, 0.63, 0.00),
vec3(0.28, 0.66, 0.06),
vec3(0.28, 0.63, 0.41),
vec3(0.25, 0.56, 0.75),
vec3(0.38, 0.63, 1.00),
vec3(0.31, 0.50, 1.00),
vec3(0.63, 0.44, 1.00),
vec3(0.94, 0.38, 1.00),

vec3(1.00, 0.38, 0.69),
vec3(1.00, 0.47, 0.19),
vec3(1.00, 0.63, 0.00),
vec3(0.91, 0.82, 0.13),
vec3(0.60, 0.91, 0.00),
vec3(0.44, 0.94, 0.25),
vec3(0.44, 0.88, 0.56),
vec3(0.38, 0.82, 0.88),
vec3(0.56, 0.82, 1.00),
vec3(0.63, 0.72, 1.00),

vec3(0.75, 0.69, 1.00),
vec3(0.88, 0.69, 1.00),
vec3(1.00, 0.72, 0.91),
vec3(1.00, 0.78, 0.72),
vec3(1.00, 0.85, 0.63),
vec3(1.00, 0.94, 0.56),
vec3(0.78, 0.94, 0.50),
vec3(0.63, 0.94, 0.63),
vec3(0.63, 1.00, 0.78),
vec3(0.63, 1.00, 0.94),

vec3(0.00, 0.00, 0.00),
vec3(0.47, 0.47, 0.47),
vec3(0.63, 0.63, 0.63),
vec3(1.00, 1.00, 1.00)
    
);
  
void main(void){
    // テクスチャから色を取得
    //一度モザイク処理する
    float set_uPos_x = uPos * 3.0;
    float set_uPos_y = uPos * 2.0;
    vec2 mUv = vec2( floor(vUv.x * set_uPos_x) / set_uPos_x, floor(vUv.y * set_uPos_y) / set_uPos_y );
    vec4 texColor = texture(uTexture, mUv);
    
    // 最小距離と最も近い色を保持する変数
    float minDist = 1000.0;
    vec3 closestColor = palette[0];
    // float r = closestColor.x - 0.2;
    // float g = closestColor.y;
    // float b = closestColor.z + 0.2;
    // float r = texture2D( uTexture, vUv + vec2( 0.01 * sin(uTime), 0.0 ) ).r;
    // float g = texture2D( uTexture, vUv ).g;
    // float b = texture2D( uTexture, vUv - vec2( 0.01 * sin(uTime), 0.0 ) ).b;

    // 各色との距離を計算
    for (int i = 0; i < 54; i++) {
        float dist = distance(texColor.rgb, palette[i]);
        if (dist < minDist) {
            minDist = dist;
            closestColor = palette[i];
        }
    }

    // float shift = sin(uTime) * 0.01;
    // float shift_x = cos(uTime) * 0.01;
    // float shift_y = sin(uTime) * 0.01;
    // float sinValue = sin(uTime);

    // float r = texture2D( uTexture, vUv + vec2( shift_y, 0.0 ) ).r;
    // float g = texture2D( uTexture, vUv ).g;
    // float b = texture2D( uTexture, vUv - vec2( shift_x, 0.0 ) ).b;

    float r2 = closestColor.x;
    float g2 = closestColor.y;
    float b2 = closestColor.z;

    vec3 noise_color = vec3(r2,g2,b2);


    // テクスチャから色を取り出してピクセルの色とします
    // gl_FragColor = texture(uTexture, mUv);
    gl_FragColor = vec4(noise_color, texColor.a);
    // gl_FragColor = vec4(noise_color, texColor.a);
    // gl_FragColor = vec4(color, texColor.a);

}