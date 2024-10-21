import{_ as B,u as k,r as w,q,s as A,o as S,c as K,a as p,t as b,v as x,x as E,p as V,f as G,W as T,S as U,P as D,y as N,z as X,V as l,M as Y,b as $}from"./CMkLAwN6.js";import{v as j}from"./DWoqyjwh.js";const J=`precision mediump float;
uniform float t; // time
uniform vec2  r; // resolution
uniform vec2  uMouse; // resolution
varying vec2 vUv;

const vec3 highlight = vec3(0.9294, 1.0, 0.4824);  // ハイライトの色
const vec3 lights[2] = vec3[](
    vec3(0.7529, 0.7529, 0.7529),
    vec3(0.3333, 0.3333, 0.3333)
);
vec3 randomColor(float seed) {
    // シードを使って疑似乱数を生成
    float r = fract(sin(seed * 12.9898) * 43758.5453);
    float g = fract(sin(seed * 78.233) * 43758.5453);
    float b = fract(sin(seed * 43.678) * 43758.5453);
    
    return vec3(r, g, b);
}
vec2 marumeVec2(vec2 _pos) {
    return floor(_pos * 10.0) / 10.0;
}

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}
// 正方形を描く
void drowRect(vec2 p, vec2 offset, vec2 size, vec3 color, inout vec3 i){
    vec2 q = (p - offset) / size;
    if(abs(q.x) < 1.0 && abs(q.y) < 1.0){
        i = color;
    }
}
// 正方形を描く
void AreaRect(vec2 p, vec2 p_mouse, vec2 size, float t,inout vec4 i){
    // pの中にはgl_FragCoord.xyが入っている。
    float _size = 0.4;
    vec2 p_range = (p - p_mouse) / _size;//表示するエリアのxy
    float mosKeisu = 20.0;
    vec2 m = vec2(
        floor(p.x * mosKeisu) / mosKeisu,
        floor(p.y * mosKeisu) / mosKeisu
    );
    float l = length(m - p_mouse);
    // float l2 = floor(l * mosKeisu) / mosKeisu;
    if(l < _size){
        vec4 setColor = vec4(
            floor(m.x * mosKeisu) / mosKeisu,
            floor(m.y * mosKeisu) / mosKeisu,
            floor(m.x * mosKeisu) / mosKeisu,
            1.0
        );
        i = setColor;
    }
}
float drawCircle(vec2 uv, vec2 center, float radius) {
    float dist = length(uv - center);  // 中心からの距離を計算
    return step(radius, dist);         // 半径以上の距離なら1.0、未満なら0.0
}
// 距離関数で円を描画
float drawCircle2(vec2 uv, vec2 center, float radius) {
    // 距離がradius未満なら内側、それ以外は外側
    return step(radius, length(uv - center));  
}

void main(void) {
    // 現在のピクセル位置
    vec2 uv = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);//-1.0 ~ 1.0の正規化
    // vec2 p = mod(uv,0.1);
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);
    
    // 円の合成結果を保持する変数
    float finalCircle = 0.0;

    // 複数の円を描くためのループ
    for (int i = 0; i < 6; i++) {
        // 各円に対して回転角度と距離を計算
        float angle = t + float(i) * 2.0;  // 円ごとに異なる時間オフセット
        float radiusOffset = 0.1 + 0.05 * float(i);  // 各円のマウスからの距離
        
        // 円の中心座標を計算
        vec2 center = uMouse + radiusOffset * vec2(cos(angle), sin(angle));
        
        // 各円を描画
        float circle = 1.0 - drawCircle(p, center, 0.05);  // 半径0.05の円
        
        // 各円を合成（最大値を取ることで円を重ね合わせる）
        finalCircle = max(finalCircle, circle);
    }
  
    // float circle = drawCircle2(p,center,0.1);

    gl_FragColor = vec4(vec3(finalCircle),1.0);
}
`,Q=v=>(V("data-v-967d376c"),v=v(),G(),v),Z={class:"l-glsl_BgContents"},ee=Q(()=>p("div",null,"MOUSE POS",-1)),ne={__name:"BgGlsl_1",setup(v){const t=k();let d=null,h=null,s=null,c=null,y=null;const C=w(null),O=w(null),f=w({x:0,y:0});let a={x:0,y:0};const F=(e,r,i)=>({init:()=>{s=new T({alpha:!0,antialias:!1});const o=window.innerWidth,m=window.innerHeight;s.setPixelRatio(1),s.setSize(o,m),s.setClearColor(0,0),e.value.appendChild(s.domElement),d=new U;const g=60,L=g/2*(Math.PI/180),W=m/2/Math.tan(L);h=new D(g,o/m,1,W*2);const I=new N(2,2,10,10);c=new X({uniforms:{uAspect:{value:window.innerWidth/window.innerHeight},r:{value:new l(window.innerWidth,window.innerHeight)},uMouse:{value:a},t:{value:0},uRectMouseTopL:{value:new l(0,0)},uRectMouseTopR:{value:new l(0,0)},uRectMouseBottomL:{value:new l(0,0)},uRectMouseBottomR:{value:new l(0,0)}},vertexShader:j,fragmentShader:J,transparent:!0});const H=new Y(I,c);d.add(H);const R=()=>{if(y=requestAnimationFrame(R),s){s.render(d,h),c.uniforms.uMouse.value=a;const P=performance.now()/1e3;c.uniforms.t.value=P;let u=z();c.uniforms.uRectMouseTopL.value=new l(u.top_l.x,u.top_l.y),c.uniforms.uRectMouseTopR.value=new l(u.top_r.x,u.top_r.y),c.uniforms.uRectMouseBottomL.value=new l(u.bottom_l.x,u.bottom_l.y),c.uniforms.uRectMouseBottomR.value=new l(u.bottom_r.y,u.bottom_r.y)}};R()}}),z=()=>{const e=window.innerWidth,r=window.innerHeight;let i=_(t.mouseOverRect.top_l.x,t.mouseOverRect.top_l.y,e,r),n=_(t.mouseOverRect.top_r.x,t.mouseOverRect.top_r.y,e,r),o=_(t.mouseOverRect.bottom_l.x,t.mouseOverRect.bottom_l.y,e,r),m=_(t.mouseOverRect.bottom_r.x,t.mouseOverRect.bottom_r.y,e,r);return t.setMouseOverRectInt(i.x,i.y,n.x,n.y,o.x,o.y,m.x,m.y),{top_l:i,top_r:n,bottom_l:o,bottom_r:m}},_=(e,r,i,n)=>({x:(e*2-i)/Math.min(i,n),y:-(r*2-n)/Math.min(i,n)}),M=e=>{a.x=e.clientX,a.y=e.clientY;const r=e.clientX,i=e.clientY,n=window.innerWidth,o=window.innerHeight;a.x=(r*2-n)/Math.min(n,o),a.y=-(i*2-o)/Math.min(n,o),f.value&&(f.value.x=parseFloat(a.x.toFixed(4)),f.value.y=parseFloat(a.y.toFixed(4)))};return q(()=>{const{init:e}=F(C);e(),window.addEventListener("mousemove",M)}),A(()=>{s&&(cancelAnimationFrame(y),s.dispose(),s.forceContextLoss()),window.removeEventListener("mousemove",M)}),(e,r)=>(S(),K("div",Z,[p("div",{class:"glsl_BgContents",ref_key:"BgContents",ref:C},null,512),p("div",{class:E(["glsl_BgContents_debug",{isActive:x(t).isDebug}]),ref_key:"glsl_BgContents_debug",ref:O},[ee,p("div",null," x:"+b(x(f).x)+",y:"+b(x(f).y),1)],2)]))}},te=B(ne,[["__scopeId","data-v-967d376c"]]),oe={};function se(v,t){const d=te;return S(),K("div",null,[$(d)])}const le=B(oe,[["render",se]]);export{le as default};
