import{_ as U,u as G,r as o,q as H,s as N,o as V,c as $,a as s,t as v,v as t,x as L,p as Y,f as z,W as X,S as q,P as Z,y as J,z as Q,V as h,M as ee,B as te,k as oe,b as M}from"./D5LukGao.js";import{v as ne}from"./DWoqyjwh.js";import{_ as se,a as le,b as re}from"./BSrSIAad.js";import"./DMAXLEiR.js";import"./C74dAFiS.js";const ie=`precision mediump float;

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
`,ae=K=>(Y("data-v-91d3808f"),K=K(),z(),K),ce={class:"l-glsl_BgContents"},ue=ae(()=>s("div",null,"MOUSE POS",-1)),me={__name:"BgGlsl",setup(K){const n=G();let T=null,g=null,a=null,f=null,S=null;const k=o(null),O=o(null),x=o({x:0,y:0});let d={x:0,y:0};const I=(e,i,u)=>({init:()=>{a=new X({alpha:!0,antialias:!1});const c=window.innerWidth,p=window.innerHeight;a.setPixelRatio(1),a.setSize(c,p),a.setClearColor(0,0),e.value.appendChild(a.domElement),T=new q;const r=60,A=r/2*(Math.PI/180),w=p/2/Math.tan(A);g=new Z(r,c/p,1,w*2);const C=new J(2,2,10,10);f=new Q({uniforms:{uAspect:{value:window.innerWidth/window.innerHeight},r:{value:new h(window.innerWidth,window.innerHeight)},uMouse:{value:d},t:{value:0},uRectMouseTopL:{value:new h(0,0)},uRectMouseTopR:{value:new h(0,0)},uRectMouseBottomL:{value:new h(0,0)},uRectMouseBottomR:{value:new h(0,0)}},vertexShader:ne,fragmentShader:ie,transparent:!0});const R=new ee(C,f);T.add(R);const y=()=>{if(S=requestAnimationFrame(y),a){a.render(T,g),f.uniforms.uMouse.value=d;const m=performance.now()/1e3;f.uniforms.t.value=m;let _=E();f.uniforms.uRectMouseTopL.value=new h(_.top_l.x,_.top_l.y),f.uniforms.uRectMouseTopR.value=new h(_.top_r.x,_.top_r.y),f.uniforms.uRectMouseBottomL.value=new h(_.bottom_l.x,_.bottom_l.y),f.uniforms.uRectMouseBottomR.value=new h(_.bottom_r.y,_.bottom_r.y)}};y()}}),E=()=>{const e=window.innerWidth,i=window.innerHeight;let u=b(n.mouseOverRect.top_l.x,n.mouseOverRect.top_l.y,e,i),l=b(n.mouseOverRect.top_r.x,n.mouseOverRect.top_r.y,e,i),c=b(n.mouseOverRect.bottom_l.x,n.mouseOverRect.bottom_l.y,e,i),p=b(n.mouseOverRect.bottom_r.x,n.mouseOverRect.bottom_r.y,e,i);return n.setMouseOverRectInt(u.x,u.y,l.x,l.y,c.x,c.y,p.x,p.y),{top_l:u,top_r:l,bottom_l:c,bottom_r:p}},b=(e,i,u,l)=>({x:(e*2-u)/Math.min(u,l),y:-(i*2-l)/Math.min(u,l)}),D=e=>{d.x=e.clientX,d.y=e.clientY;const i=e.clientX,u=e.clientY,l=window.innerWidth,c=window.innerHeight;d.x=(i*2-l)/Math.min(l,c),d.y=-(u*2-c)/Math.min(l,c),x.value&&(x.value.x=parseFloat(d.x.toFixed(4)),x.value.y=parseFloat(d.y.toFixed(4)))};return H(()=>{const{init:e}=I(k);e(),window.addEventListener("mousemove",D)}),N(()=>{a&&(cancelAnimationFrame(S),a.dispose(),a.forceContextLoss()),window.removeEventListener("mousemove",D)}),(e,i)=>(V(),$("div",ce,[s("div",{class:"glsl_BgContents",ref_key:"BgContents",ref:k},null,512),s("div",{class:L(["glsl_BgContents_debug",{isActive:t(n).isDebug}]),ref_key:"glsl_BgContents_debug",ref:O},[ue,s("div",null," x:"+v(t(x).x)+",y:"+v(t(x).y),1)],2)]))}},de=U(me,[["__scopeId","data-v-91d3808f"]]),ve={class:"l-content-scroll"},fe={class:"l-content-wrapper"},pe={class:"l-content-wrapper-inner"},_e={class:"l-selectCursor"},be={__name:"index",setup(K){const n=o(-1),T=te(),g=G();o(null);const a=o(null),f=o(!1),S=o(""),k=o(null),O=o(null),x=o(null),d=o(null);o(!1);const I=o(null),E=o(null),b=o(null),D=o(null),e=o({topLeft:{x:"0",y:"0"},topRight:{x:"0",y:"0"},bottomLeft:{x:"0",y:"0"},bottomRight:{x:"0",y:"0"}}),i=r=>{S.value=r},u=o(!1),l=()=>{const r=d.value.getBoundingClientRect(),A=1,w=r.width*A,C=r.height*A,R=r.left+r.width/2,y=r.top+r.height/2,m={left:R-w/2,right:R+w/2,top:y-C/2,bottom:y+C/2};e.value.topLeft.x=Math.floor(m.left),e.value.topLeft.y=Math.floor(m.top),e.value.topRight.x=Math.floor(m.right),e.value.topRight.y=Math.floor(m.top),e.value.bottomLeft.x=Math.floor(m.left),e.value.bottomLeft.y=Math.floor(m.bottom),e.value.bottomRight.x=Math.floor(m.right),e.value.bottomRight.y=Math.floor(m.bottom);const _=[k,O,x];u.value=_.some((P,j)=>{const B=P.value.container.getBoundingClientRect(),W={x:(B.right-B.left)/2+B.left,y:(B.bottom-B.top)/2+B.top};let F=!1;return m.top<W.y&&W.y<m.bottom&&(P.value.sendTitle(),P.value.animationPlay(),F=!0,n.value=j),F||(n.value=-1,S.value=""),F})},c=()=>{window.scrollY===0&&T.setMainBasicColor()},p=()=>{if(!a.value)return;const r=a.value.getBoundingClientRect();f.value=r.top<=0};return H(()=>{window.addEventListener("scroll",p),l(),window.addEventListener("scroll",l),window.addEventListener("scroll",c)}),N(()=>{window.removeEventListener("scroll",p)}),oe(()=>{window.removeEventListener("scroll",l)}),(r,A)=>{const w=de,C=le,R=se,y=re;return V(),$("div",null,[s("div",ve,[M(w),s("div",fe,[s("div",pe,[s("div",_e,[s("div",{class:L(["p-selectCursor",{isDebug:t(g).isDebug}])},[s("div",{class:L(["c-selectCursor",{isDebug:t(g).isDebug}]),ref_key:"selectCursor",ref:d},[s("div",{class:L(["c-selectCursor-pos debugBox",{isActive:t(g).isDebug}])},[s("div",{class:"c-selectCursor-pos-disp -topLeft",ref_key:"selectCursorTopLeft",ref:I}," ("+v(t(e).topLeft.x)+","+v(t(e).topLeft.y)+") ",513),s("div",{class:"c-selectCursor-pos-disp -topRight",ref_key:"selectCursorTopRight",ref:E}," ("+v(t(e).topRight.x)+","+v(t(e).topRight.y)+") ",513),s("div",{class:"c-selectCursor-pos-disp -bottomLeft",ref_key:"selectCursorBottomLeft",ref:b}," ("+v(t(e).bottomLeft.x)+","+v(t(e).bottomLeft.y)+") ",513),s("div",{class:"c-selectCursor-pos-disp -bottomRight",ref_key:"selectCursorBottomRight",ref:D}," ("+v(t(e).bottomRight.x)+","+v(t(e).bottomRight.y)+") ",513)],2),s("div",{class:L(["c-selectCursor-name",{isActive:t(g).isDebug}])}," Touch Area ",2)],2)],2)]),M(C),s("div",{class:L(["debugBox debugShowActiveObjIndex",{isActive:t(g).isDebug}])}," Active Obj index: "+v(t(n)),3),M(R,{ref_key:"Box3D_lo_1",ref:k,modelIndex:"1",title:"NIKE AIR JORDAN 1",cgPath:"/nuxt3/object/sneaker_lo.glb",mainColor:"#473acc",isActive:t(n)===0,onGetTitle:i},null,8,["isActive"]),M(R,{ref_key:"Box3D_lo_2",ref:O,modelIndex:"2",title:"NIKE DUNK",cgPath:"/nuxt3/object/sneaker_lo_2.glb",mainColor:"#F00",isActive:t(n)===1,onGetTitle:i},null,8,["isActive"]),M(R,{ref_key:"Box3D_lo_3",ref:x,modelIndex:"3",title:"OTHERS",cgPath:"/nuxt3/object/sneaker_lo_others.glb",mainColor:"#333",isActive:t(n)===2,onGetTitle:i},null,8,["isActive"])])])]),M(y)])}}};export{be as default};
