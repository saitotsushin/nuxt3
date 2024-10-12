import{_ as y}from"./Cxyd1mXp.js";import{s as S,r as _,S as h,u as U,o as D,c as E,a as M,W as R,P as p,x as W,T as A,A as F,y as k,M as z}from"./NWOllZA8.js";import{v as B}from"./C74dAFiS.js";const G=`  uniform sampler2D uTexture;
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

}`,N=S({__name:"mosaic2",setup(L){const f=_(null),d=_(null);var o,c=!1,a=new h,x={uPos:20,uTime:0,uTexture:o};const T=(s,C,H)=>({init:()=>{const n=new R({alpha:!0,antialias:!0});d.value.getBoundingClientRect();var v=0,t=0,i=new p(45,window.innerWidth/window.outerWidth,1,2e3);const l=new W,w=new A;var P=new F(16777215);l.add(P),o=w.load("/nuxt3/images/thumb/12.jpg",function(e){v=e.image.naturalWidth,t=e.image.naturalHeight,n.setSize(v,t),n.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1);const r=60,m=r/2*(Math.PI/180),u=t/2/Math.tan(m);i=new p(r,v/t,1,u*2),i.position.z=u,s.value.appendChild(n.domElement),n.domElement.style.width="100%",b()}),n.debug.onShaderError=(e,r,m,u)=>{e.getShaderSource(m),e.getShaderSource(u),console.groupCollapsed("vertexShader"),console.groupEnd(),console.groupCollapsed("fragmentShader"),console.groupEnd()};function b(){const e=new k(v,t,1);console.log("texture",o),x.uTexture=o,a=new h({uniforms:{uTime:{value:0},uPos:{value:x.uPos},uTexture:{value:o}},vertexShader:B,fragmentShader:G});const r=new z(e,a);l.add(r),c=!0,console.log("isActive",c)}function g(e){requestAnimationFrame(g),c&&(a.uniforms.uPos.value=20,a.uniforms.uTime.value=e),n.render(l,i)}console.log(c),g(0),n.render(l,i)}});return U(()=>{const{init:s}=T(f);s()}),(s,C)=>(D(),E("div",{class:"webGL_glsi_box",ref_key:"container",ref:f},[M("img",{src:y,ref_key:"thumb",ref:d},null,512)],512))}});export{N as default};
