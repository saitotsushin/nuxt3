import{_ as U}from"./NQ2WOdUU.js";import{q as b,r as _,F as h,v as M,o as T,c as E,a as R,W,P as x,D,T as k,N as A,E as B,M as F}from"./6YmdV6tA.js";const G=`
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
        `,L=`
  uniform sampler2D uTexture;
  varying vec2 vUv;
  uniform float uPos;
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
    
    // 各色との距離を計算
    for (int i = 0; i < 54; i++) {
        float dist = distance(texColor.rgb, palette[i]);
        if (dist < minDist) {
            minDist = dist;
            closestColor = palette[i];
        }
    }

    // vec2 uv = vec2( floor(vUv.x * 40.0) / 40.0, floor(vUv.y * 17.0) / 17.0 );

    // テクスチャから色を取り出してピクセルの色とします
    // gl_FragColor = texture(uTexture, mUv);
    gl_FragColor = vec4(closestColor, texColor.a);

}
        `,V=b({__name:"mosaic",setup(j){const f=_(null),g=_(null);var r,n=!1,u=new h,d={uPos:20,uTexture:r};const P=(v,w,q)=>({init:()=>{const o=new W({alpha:!0,antialias:!0});g.value.getBoundingClientRect();var a=0,t=0,s=new x(45,window.innerWidth/window.outerWidth,1,2e3);const i=new D,C=new k;var S=new A(16777215);i.add(S),r=C.load("/nuxt3/images/thumb/12.jpg",function(e){a=e.image.naturalWidth,t=e.image.naturalHeight,o.setSize(a,t),o.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1);const c=60,m=c/2*(Math.PI/180),l=t/2/Math.tan(m);s=new x(c,a/t,1,l*2),s.position.z=l,v.value.appendChild(o.domElement),o.domElement.style.width="100%",y()}),o.debug.onShaderError=(e,c,m,l)=>{e.getShaderSource(m),e.getShaderSource(l),console.groupCollapsed("vertexShader"),console.groupEnd(),console.groupCollapsed("fragmentShader"),console.groupEnd()};function y(){const e=new B(a,t,1);d.uTexture=r,u=new h({uniforms:{uPos:{value:d.uPos},uTexture:{value:r}},vertexShader:G,fragmentShader:L});const c=new F(e,u);i.add(c),n=!0,console.log("isActive",n)}function p(e){requestAnimationFrame(p),n&&(console.log("uniforms.uPos",d.uPos),u.uniforms.uPos.value=e*.01),o.render(i,s)}console.log(n),p(0),o.render(i,s)}});return M(()=>{const{init:v}=P(f);v()}),(v,w)=>(T(),E("div",{class:"webGL_glsi_box",ref_key:"container",ref:f},[R("img",{src:U,ref_key:"thumb",ref:g},null,512)],512))}});export{V as default};
