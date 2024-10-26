import{_ as X,u as W,r as o,g as G,h as j,o as H,c as N,a as n,t as a,i as t,n as R,p as $,f as U,W as q,S as z,P as Z,j as J,k as Q,V as ee,M as te,m as oe,q as ne,b as S}from"./moyrZwSY.js";import{v as se}from"./DWoqyjwh.js";import{_ as le,a as ie}from"./CjP0RZ-H.js";import"./DMAXLEiR.js";import"./C74dAFiS.js";const re=`precision mediump float;

uniform vec2 r; // 画面サイズ (u_resolution)
uniform float t; // 時間 (u_time)
uniform vec2  uMouse; // resolution
// uniform vec2  uRectMouseTopL;
// uniform vec2  uRectMouseTopR;
// uniform vec2  uRectMouseBottomL;
// uniform vec2  uRectMouseBottomR;
uniform bool  uIsRectMouseOver;


// 疑似乱数生成器
float random(float seed) {
    return fract(sin(seed) * 43758.5453123);
}
// float 値に基づく疑似乱数生成関数（0.0-1.0の乱数）
float random1(float x) {
    return fract(sin(x) * 43758.5453);
}
// ランダムで 0 または 1 を返す関数
float randomZeroOrOne(float x) {
    // ランダムな float 値を生成 (0.0 ~ 1.0)
    float randValue = fract(sin(x) * 43758.5453);
    // 0.5 以上なら 1、未満なら 0 を返す
    return randValue < 0.5 ? 0.0 : 1.0;
}
// メタボールの形状を生成
float metaball(vec2 p, vec2 p_mouse, float radius) {
    float mosKeisu = 20.0;
    vec2 m = vec2(
        floor(p.x * mosKeisu) / mosKeisu,
        floor(p.y * mosKeisu) / mosKeisu
    );
    vec2 m2 = vec2(
        floor(p_mouse.x * mosKeisu) / mosKeisu,
        floor(p_mouse.y * mosKeisu) / mosKeisu
    );          
    float dist = length(m - m2);
    return radius / dist; // 距離に基づいて影響を計算
}

// ノイズ生成
float noise(vec2 p, float time) {
    float mosKeisu = 20.0;
    vec2 m = vec2(
        floor(p.x * mosKeisu) / mosKeisu,
        floor(p.y * mosKeisu) / mosKeisu
    );    
    return 0.05 * sin(m.x * 10.0 + time) + 0.05 * cos(m.y * 10.0 + time);
}
void main() {
    // 現在のピクセル位置
    // vec2 uv = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);//-1.0 ~ 1.0の正規化
    // vec2 p = mod(uv,0.1);
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);

    // メタボールの位置
    // vec2 ballPos = vec2(0.0); // 中心に配置

    // メタボールの半径
    float baseRadius = 0.4; // 基本の半径
    float randomRadius = baseRadius + noise(p, t); // ランダムな外周

    // メタボールの影響を計算
    float value = metaball(p, uMouse, randomRadius);
    
    // 最終的に出力される色
    vec4 destColor = vec4(0.9529, 0.3216, 0.3216,0.0);

    float mosKeisu = 20.0;
    vec4 setColor = vec4(0.0, 0.0, 0.0, 0.0);
 
    if (value > 1.0) {
        float randomBlock = 0.0;
        // float dist = distance(uMouse,vec2(value.value));
        // if(value > 2.0){
        //     randomBlock = random1(1.0);
        // }
        // float alpha =  abs(value * 0.1 - randomBlock * 0.05);
        // float alpha = 1.0;
        // 距離に基づく透明度の設定
        float distToCenter = length(p - uMouse); // メタボールの中心との距離
        float alpha = smoothstep(randomRadius, randomRadius * 0.5, distToCenter);

        // float alpha = value * randomZeroOrOne(p.x + p.y);
        if(uIsRectMouseOver){
            setColor = vec4(1.0, 1.0, 1.0, value * 0.2);
        }else{
            setColor = vec4(
                // floor(p.x * mosKeisu) / mosKeisu,
                // floor(p.x * mosKeisu) / mosKeisu,
                // floor(p.x * mosKeisu) / mosKeisu,
                0.0,
                0.0,
                0.0,
                value * 0.05
            );
        }
        destColor = setColor;
    }

    gl_FragColor = vec4(destColor);
}
`,ae=B=>($("data-v-964ff133"),B=B(),U(),B),ce={class:"l-glsl_BgContents"},ue=ae(()=>n("div",null,"MOUSE POS",-1)),de={__name:"BgGlsl",setup(B){const m=W();let M=null,f=null,s=null,p=null,L=null;const K=o(null),A=o(null),v=o({x:0,y:0});let l={x:0,y:0};const E=(i,h,e)=>({init:()=>{s=new q({alpha:!0,antialias:!1});const c=window.innerWidth,u=window.innerHeight;s.setPixelRatio(1),s.setSize(c,u),s.setClearColor(0,0),i.value.appendChild(s.domElement),M=new z;const C=60,I=C/2*(Math.PI/180),D=u/2/Math.tan(I);f=new Z(C,c/u,1,D*2);const r=new J(2,2,10,10);p=new Q({uniforms:{uAspect:{value:window.innerWidth/window.innerHeight},r:{value:new ee(window.innerWidth,window.innerHeight)},uMouse:{value:l},t:{value:0},uIsRectMouseOver:{value:!1}},vertexShader:se,fragmentShader:re,transparent:!0});const k=new te(r,p);M.add(k);const g=()=>{if(L=requestAnimationFrame(g),s){s.render(M,f),p.uniforms.uMouse.value=l;const w=performance.now()/1e3;p.uniforms.t.value=w,p.uniforms.uIsRectMouseOver.value=m.isSwitchMouseOver}};g()}}),x=i=>{let h=0,e=0;if(i.type.startsWith("touch")){const u=i.touches[0];l.x=u.clientX,l.y=u.clientY,h=u.clientX,e=u.clientY}else l.x=i.clientX,l.y=i.clientY,h=i.clientX,e=i.clientY;const _=window.innerWidth,c=window.innerHeight;l.x=(h*2-_)/Math.min(_,c),l.y=-(e*2-c)/Math.min(_,c),v.value&&(v.value.x=parseFloat(l.x.toFixed(4)),v.value.y=parseFloat(l.y.toFixed(4)))};return G(()=>{const{init:i}=E(K);i(),window.addEventListener("mousemove",x),window.addEventListener("touchmove",x)}),j(()=>{s&&(cancelAnimationFrame(L),s.dispose(),s.forceContextLoss()),window.removeEventListener("mousemove",x),window.removeEventListener("touchmove",x)}),(i,h)=>(H(),N("div",ce,[n("div",{class:"glsl_BgContents",ref_key:"BgContents",ref:K},null,512),n("div",{class:R(["glsl_BgContents_debug",{isActive:t(m).isDebug}]),ref_key:"glsl_BgContents_debug",ref:A},[ue,n("div",null," x:"+a(t(v).x)+",y:"+a(t(v).y),1)],2)]))}},me=X(de,[["__scopeId","data-v-964ff133"]]),fe={class:"l-content-scroll"},ve={class:"l-content-wrapper"},pe={class:"l-content-wrapper-inner"},he={class:"l-selectCursor"},be={__name:"index",setup(B){const m=o(-1),M=oe(),f=W();o(null);const s=o(null),p=o(!1),L=o(""),K=o(null),A=o(null),v=o(null),l=o(null);o(!1);const E=o(null),x=o(null),i=o(null),h=o(null),e=o({topLeft:{x:"0",y:"0"},topRight:{x:"0",y:"0"},bottomLeft:{x:"0",y:"0"},bottomRight:{x:"0",y:"0"}});let _;const c=r=>{L.value=r},u=o(!1),C=()=>{const r=l.value.getBoundingClientRect(),k=1,g=r.width*k,w=r.height*k,b=r.left+r.width/2,P=r.top+r.height/2,d={left:b-g/2,right:b+g/2,top:P-w/2,bottom:P+w/2};e.value.topLeft.x=Math.floor(d.left),e.value.topLeft.y=Math.floor(d.top),e.value.topRight.x=Math.floor(d.right),e.value.topRight.y=Math.floor(d.top),e.value.bottomLeft.x=Math.floor(d.left),e.value.bottomLeft.y=Math.floor(d.bottom),e.value.bottomRight.x=Math.floor(d.right),e.value.bottomRight.y=Math.floor(d.bottom);const V=[K,A,v];u.value=V.some((O,Y)=>{const y=O.value.container.getBoundingClientRect(),F={x:(y.right-y.left)/2+y.left,y:(y.bottom-y.top)/2+y.top};let T=!1;return d.top<F.y&&F.y<d.bottom&&(O.value.sendTitle(),O.value.animationPlay(),T=!0,m.value=Y),T||(m.value=-1,L.value=""),T})},I=()=>{window.scrollY===0&&(_.style.backgroundColor=M.baseColor)},D=()=>{if(!s.value)return;const r=s.value.getBoundingClientRect();p.value=r.top<=0};return G(()=>{window.addEventListener("scroll",D),C(),window.addEventListener("scroll",C),window.addEventListener("scroll",I),_=document.getElementById("l-wrapper")}),j(()=>{window.removeEventListener("scroll",I),window.removeEventListener("scroll",D)}),ne(()=>{window.removeEventListener("scroll",C)}),(r,k)=>{const g=me,w=ie,b=le;return H(),N("div",null,[n("div",fe,[S(g),n("div",ve,[n("div",pe,[n("div",he,[n("div",{class:R(["p-selectCursor",{isDebug:t(f).isDebug}])},[n("div",{class:R(["c-selectCursor",{isDebug:t(f).isDebug}]),ref_key:"selectCursor",ref:l},[n("div",{class:R(["c-selectCursor-pos debugBox",{isActive:t(f).isDebug}])},[n("div",{class:"c-selectCursor-pos-disp -topLeft",ref_key:"selectCursorTopLeft",ref:E}," ("+a(t(e).topLeft.x)+","+a(t(e).topLeft.y)+") ",513),n("div",{class:"c-selectCursor-pos-disp -topRight",ref_key:"selectCursorTopRight",ref:x}," ("+a(t(e).topRight.x)+","+a(t(e).topRight.y)+") ",513),n("div",{class:"c-selectCursor-pos-disp -bottomLeft",ref_key:"selectCursorBottomLeft",ref:i}," ("+a(t(e).bottomLeft.x)+","+a(t(e).bottomLeft.y)+") ",513),n("div",{class:"c-selectCursor-pos-disp -bottomRight",ref_key:"selectCursorBottomRight",ref:h}," ("+a(t(e).bottomRight.x)+","+a(t(e).bottomRight.y)+") ",513)],2),n("div",{class:R(["c-selectCursor-name",{isActive:t(f).isDebug}])}," Touch Area ",2)],2)],2)]),S(w),n("div",{class:R(["debugBox debugShowActiveObjIndex",{isActive:t(f).isDebug}])}," Active Obj index: "+a(t(m)),3),S(b,{ref_key:"Box3D_lo_1",ref:K,modelIndex:"1",title:"NIKE AIR JORDAN 1",cgPath:"/nuxt3/object/sneaker_lo.glb",mainColor:"#473acc",mainColor2:"#3456bb",isActive:t(m)===0,onGetTitle:c},null,8,["isActive"]),S(b,{ref_key:"Box3D_lo_2",ref:A,modelIndex:"2",title:"NIKE DUNK",cgPath:"/nuxt3/object/sneaker_lo_2.glb",mainColor:"#385372",mainColor2:"#646567",isActive:t(m)===1,onGetTitle:c},null,8,["isActive"]),S(b,{ref_key:"Box3D_lo_3",ref:v,modelIndex:"3",title:"OTHERS",cgPath:"/nuxt3/object/sneaker_lo_others.glb",mainColor:"#2f2f2a",mainColor2:"#181810",isActive:t(m)===2,onGetTitle:c},null,8,["isActive"])])])])])}}};export{be as default};
