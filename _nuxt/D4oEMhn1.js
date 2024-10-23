import{_ as j,u as G,r as o,q as H,s as N,o as V,c as Y,a as s,t as f,v as t,x as K,p as X,f as U,W as z,S as q,P as Z,y as J,z as Q,V as h,M as ee,B as te,k as oe,b as L}from"./CK2fJWvk.js";import{v as ne}from"./DWoqyjwh.js";import{_ as se,a as le,b as re}from"./DfN0LDcS.js";import"./C74dAFiS.js";import"./DMAXLEiR.js";const ie=`precision mediump float;

uniform vec2 r; // 画面サイズ (u_resolution)
uniform float t; // 時間 (u_time)
uniform vec2  uMouse; // resolution
uniform vec2  uRectMouseTopL;
uniform vec2  uRectMouseTopR;
uniform vec2  uRectMouseBottomL;
uniform vec2  uRectMouseBottomR;

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
        if(
            uRectMouseTopL.x < p.x && p.x < uRectMouseTopR.x && 
            uRectMouseBottomR.y < p.y && p.y < uRectMouseTopL.y
        ){
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
`,ae=T=>(X("data-v-efce1b97"),T=T(),U(),T),ce={class:"l-glsl_BgContents"},ue=ae(()=>s("div",null,"MOUSE POS",-1)),me={__name:"BgGlsl",setup(T){const n=G();let S=null,g=null,u=null,p=null,k=null;const A=o(null),D=o(null),x=o({x:0,y:0});let m={x:0,y:0};const E=(e,l,c)=>({init:()=>{u=new z({alpha:!0,antialias:!1});const d=window.innerWidth,i=window.innerHeight;u.setPixelRatio(1),u.setSize(d,i),u.setClearColor(0,0),e.value.appendChild(u.domElement),S=new q;const a=60,O=a/2*(Math.PI/180),C=i/2/Math.tan(O);g=new Z(a,d/i,1,C*2);const B=new J(2,2,10,10);p=new Q({uniforms:{uAspect:{value:window.innerWidth/window.innerHeight},r:{value:new h(window.innerWidth,window.innerHeight)},uMouse:{value:m},t:{value:0},uRectMouseTopL:{value:new h(0,0)},uRectMouseTopR:{value:new h(0,0)},uRectMouseBottomL:{value:new h(0,0)},uRectMouseBottomR:{value:new h(0,0)}},vertexShader:ne,fragmentShader:ie,transparent:!0});const R=new ee(B,p);S.add(R);const y=()=>{if(k=requestAnimationFrame(y),u){u.render(S,g),p.uniforms.uMouse.value=m;const v=performance.now()/1e3;p.uniforms.t.value=v;let _=I();p.uniforms.uRectMouseTopL.value=new h(_.top_l.x,_.top_l.y),p.uniforms.uRectMouseTopR.value=new h(_.top_r.x,_.top_r.y),p.uniforms.uRectMouseBottomL.value=new h(_.bottom_l.x,_.bottom_l.y),p.uniforms.uRectMouseBottomR.value=new h(_.bottom_r.y,_.bottom_r.y)}};y()}}),I=()=>{const e=window.innerWidth,l=window.innerHeight;let c=b(n.mouseOverRect.top_l.x,n.mouseOverRect.top_l.y,e,l),r=b(n.mouseOverRect.top_r.x,n.mouseOverRect.top_r.y,e,l),d=b(n.mouseOverRect.bottom_l.x,n.mouseOverRect.bottom_l.y,e,l),i=b(n.mouseOverRect.bottom_r.x,n.mouseOverRect.bottom_r.y,e,l);return n.setMouseOverRectInt(c.x,c.y,r.x,r.y,d.x,d.y,i.x,i.y),{top_l:c,top_r:r,bottom_l:d,bottom_r:i}},b=(e,l,c,r)=>({x:(e*2-c)/Math.min(c,r),y:-(l*2-r)/Math.min(c,r)}),w=e=>{let l=0,c=0;if(e.type.startsWith("touch")){const i=e.touches[0];m.x=i.clientX,m.y=i.clientY,l=i.clientX,c=i.clientY}else m.x=e.clientX,m.y=e.clientY,l=e.clientX,c=e.clientY;const r=window.innerWidth,d=window.innerHeight;m.x=(l*2-r)/Math.min(r,d),m.y=-(c*2-d)/Math.min(r,d),x.value&&(x.value.x=parseFloat(m.x.toFixed(4)),x.value.y=parseFloat(m.y.toFixed(4)))};return H(()=>{const{init:e}=E(A);e(),window.addEventListener("mousemove",w),window.addEventListener("touchmove",w)}),N(()=>{u&&(cancelAnimationFrame(k),u.dispose(),u.forceContextLoss()),window.removeEventListener("mousemove",w),window.removeEventListener("touchmove",w)}),(e,l)=>(V(),Y("div",ce,[s("div",{class:"glsl_BgContents",ref_key:"BgContents",ref:A},null,512),s("div",{class:K(["glsl_BgContents_debug",{isActive:t(n).isDebug}]),ref_key:"glsl_BgContents_debug",ref:D},[ue,s("div",null," x:"+f(t(x).x)+",y:"+f(t(x).y),1)],2)]))}},de=j(me,[["__scopeId","data-v-efce1b97"]]),ve={class:"l-content-scroll"},fe={class:"l-content-wrapper"},pe={class:"l-content-wrapper-inner"},_e={class:"l-selectCursor"},be={__name:"index",setup(T){const n=o(-1),S=te(),g=G();o(null);const u=o(null),p=o(!1),k=o(""),A=o(null),D=o(null),x=o(null),m=o(null);o(!1);const E=o(null),I=o(null),b=o(null),w=o(null),e=o({topLeft:{x:"0",y:"0"},topRight:{x:"0",y:"0"},bottomLeft:{x:"0",y:"0"},bottomRight:{x:"0",y:"0"}}),l=a=>{k.value=a},c=o(!1),r=()=>{const a=m.value.getBoundingClientRect(),O=1,C=a.width*O,B=a.height*O,R=a.left+a.width/2,y=a.top+a.height/2,v={left:R-C/2,right:R+C/2,top:y-B/2,bottom:y+B/2};e.value.topLeft.x=Math.floor(v.left),e.value.topLeft.y=Math.floor(v.top),e.value.topRight.x=Math.floor(v.right),e.value.topRight.y=Math.floor(v.top),e.value.bottomLeft.x=Math.floor(v.left),e.value.bottomLeft.y=Math.floor(v.bottom),e.value.bottomRight.x=Math.floor(v.right),e.value.bottomRight.y=Math.floor(v.bottom);const _=[A,D,x];c.value=_.some((P,$)=>{const M=P.value.container.getBoundingClientRect(),W={x:(M.right-M.left)/2+M.left,y:(M.bottom-M.top)/2+M.top};let F=!1;return v.top<W.y&&W.y<v.bottom&&(P.value.sendTitle(),P.value.animationPlay(),F=!0,n.value=$),F||(n.value=-1,k.value=""),F})},d=()=>{window.scrollY===0&&S.setMainBasicColor()},i=()=>{if(!u.value)return;const a=u.value.getBoundingClientRect();p.value=a.top<=0};return H(()=>{window.addEventListener("scroll",i),r(),window.addEventListener("scroll",r),window.addEventListener("scroll",d)}),N(()=>{window.removeEventListener("scroll",i)}),oe(()=>{window.removeEventListener("scroll",r)}),(a,O)=>{const C=de,B=le,R=se,y=re;return V(),Y("div",null,[s("div",ve,[L(C),s("div",fe,[s("div",pe,[s("div",_e,[s("div",{class:K(["p-selectCursor",{isDebug:t(g).isDebug}])},[s("div",{class:K(["c-selectCursor",{isDebug:t(g).isDebug}]),ref_key:"selectCursor",ref:m},[s("div",{class:K(["c-selectCursor-pos debugBox",{isActive:t(g).isDebug}])},[s("div",{class:"c-selectCursor-pos-disp -topLeft",ref_key:"selectCursorTopLeft",ref:E}," ("+f(t(e).topLeft.x)+","+f(t(e).topLeft.y)+") ",513),s("div",{class:"c-selectCursor-pos-disp -topRight",ref_key:"selectCursorTopRight",ref:I}," ("+f(t(e).topRight.x)+","+f(t(e).topRight.y)+") ",513),s("div",{class:"c-selectCursor-pos-disp -bottomLeft",ref_key:"selectCursorBottomLeft",ref:b}," ("+f(t(e).bottomLeft.x)+","+f(t(e).bottomLeft.y)+") ",513),s("div",{class:"c-selectCursor-pos-disp -bottomRight",ref_key:"selectCursorBottomRight",ref:w}," ("+f(t(e).bottomRight.x)+","+f(t(e).bottomRight.y)+") ",513)],2),s("div",{class:K(["c-selectCursor-name",{isActive:t(g).isDebug}])}," Touch Area ",2)],2)],2)]),L(B),s("div",{class:K(["debugBox debugShowActiveObjIndex",{isActive:t(g).isDebug}])}," Active Obj index: "+f(t(n)),3),L(R,{ref_key:"Box3D_lo_1",ref:A,modelIndex:"1",title:"NIKE AIR JORDAN 1",cgPath:"/nuxt3/object/sneaker_lo.glb",mainColor:"#473acc",isActive:t(n)===0,onGetTitle:l},null,8,["isActive"]),L(R,{ref_key:"Box3D_lo_2",ref:D,modelIndex:"2",title:"NIKE DUNK",cgPath:"/nuxt3/object/sneaker_lo_2.glb",mainColor:"#F00",isActive:t(n)===1,onGetTitle:l},null,8,["isActive"]),L(R,{ref_key:"Box3D_lo_3",ref:x,modelIndex:"3",title:"OTHERS",cgPath:"/nuxt3/object/sneaker_lo_others.glb",mainColor:"#333",isActive:t(n)===2,onGetTitle:l},null,8,["isActive"])])])]),L(y)])}}};export{be as default};
