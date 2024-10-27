import{_ as q,u as P,r as s,g as F,h as G,o as $,c as N,a as t,t as _,i as n,n as S,p as z,f as Z,W as H,S as V,P as Y,j as J,k as Q,V as ee,M as te,l as oe,B as ne,C as se,E as le,x as ie,D as ae,G as ce,m as re,q as ue,b as K}from"./B31o5omS.js";import{v as de}from"./DWoqyjwh.js";import{_ as me,a as fe}from"./BLcKSYZF.js";import"./DMAXLEiR.js";import"./C74dAFiS.js";const ve=`precision mediump float;

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
`,pe=A=>(z("data-v-964ff133"),A=A(),Z(),A),he={class:"l-glsl_BgContents"},_e=pe(()=>t("div",null,"MOUSE POS",-1)),ge={__name:"BgGlsl",setup(A){const r=P();let x=null,m=null,l=null,f=null,g=null;const y=s(null),R=s(null),w=s({x:0,y:0});let o={x:0,y:0};const p=(i,c,e)=>({init:()=>{l=new H({alpha:!0,antialias:!1});const a=window.innerWidth,d=window.innerHeight;l.setPixelRatio(1),l.setSize(a,d),l.setClearColor(0,0),i.value.appendChild(l.domElement),x=new V;const B=60,L=B/2*(Math.PI/180),C=d/2/Math.tan(L);m=new Y(B,a/d,1,C*2);const v=new J(2,2,10,10);f=new Q({uniforms:{uAspect:{value:window.innerWidth/window.innerHeight},r:{value:new ee(window.innerWidth,window.innerHeight)},uMouse:{value:o},t:{value:0},uIsRectMouseOver:{value:!1}},vertexShader:de,fragmentShader:ve,transparent:!0});const W=new te(v,f);x.add(W);const M=()=>{if(g=requestAnimationFrame(M),l){l.render(x,m),f.uniforms.uMouse.value=o;const k=performance.now()/1e3;f.uniforms.t.value=k,f.uniforms.uIsRectMouseOver.value=r.isSwitchMouseOver}};M()}}),h=i=>{let c=0,e=0;if(i.type.startsWith("touch")){const d=i.touches[0];o.x=d.clientX,o.y=d.clientY,c=d.clientX,e=d.clientY}else o.x=i.clientX,o.y=i.clientY,c=i.clientX,e=i.clientY;const u=window.innerWidth,a=window.innerHeight;o.x=(c*2-u)/Math.min(u,a),o.y=-(e*2-a)/Math.min(u,a),w.value&&(w.value.x=parseFloat(o.x.toFixed(4)),w.value.y=parseFloat(o.y.toFixed(4)))};return F(()=>{const{init:i}=p(y);i(),window.addEventListener("mousemove",h),window.addEventListener("touchmove",h)}),G(()=>{l&&(cancelAnimationFrame(g),l.dispose(),l.forceContextLoss()),window.removeEventListener("mousemove",h),window.removeEventListener("touchmove",h)}),(i,c)=>($(),N("div",he,[t("div",{class:"glsl_BgContents",ref_key:"BgContents",ref:y},null,512),t("div",{class:S(["glsl_BgContents_debug",{isActive:n(r).isDebug}]),ref_key:"glsl_BgContents_debug",ref:R},[_e,t("div",null," x:"+_(n(w).x)+",y:"+_(n(w).y),1)],2)]))}},we=q(ge,[["__scopeId","data-v-964ff133"]]),be=t("div",{class:"p-about-window-bar-title"},"ABOUT",-1),xe=t("span",null,null,-1),Ce=t("span",null,null,-1),ye=[xe,Ce],Re={class:"p-about-contents"},Be={class:"c-dotWindow"},Le={class:"p-about-comment"},Me=t("div",{class:"p-about-comment-name"},"サイトウ通信",-1),Se=se('<div class="c-dotWindow-inner"><div class="c-dotWindow_LeftRight c-dotWindow--dot"></div><div class="c-dotWindow_TopBottom c-dotWindow--dot"></div><div class="c-dotWindow_Top c-dotWindow--dot"></div><div class="c-dotWindow_Bottom c-dotWindow--dot"></div></div>',1),Ae=oe({__name:"About",setup(A){const r=P(),x=s(null),m=s(null);let l,f,g=!1;const y=()=>{r.showAboutModal(!r.isShowAboutModal),r.isShowAboutModal&&(g||(g=!0,R()))},R=()=>{let o=m.value.textContent;m.value.innerHTML="";const p=o==null?void 0:o.split("");var h=[];p==null||p.forEach((e,u)=>{const a=document.createElement("span");e==" "&&a.classList.add("nameSpacer"),a.textContent=e,h.push(a)});const i=document.createElement("div");i.classList.add("commentList"),h.forEach((e,u)=>{i.appendChild(h[u])}),m.value.appendChild(i),i.querySelectorAll("span").forEach((e,u)=>{setTimeout(()=>{e.style.display="inline-block"},u*60)})},w=(o,p,h)=>({init:()=>{const c=new H({alpha:!0,antialias:!1}),e=256,u=192;c.setPixelRatio(1),c.setSize(e,u),c.setClearColor(0,0),o.value.appendChild(c.domElement),l=new V;const a=new Y(45,e/u,.1,70);a.position.set(0,3,4),a.lookAt(new ie(0,1,0));const d=new ae(16777215);d.intensity=4,d.position.set(0,2,1),l.add(d),new ce().load("/nuxt3/object/face.glb",C=>{f=C.scene,f.position.set(0,1.4,0),l.add(f)},void 0,function(C){console.error(C)});const L=()=>{requestAnimationFrame(L),f&&(f.rotation.y+=.01),c.render(l,a)};L(),c.render(l,a),G(()=>{c.dispose(),c.forceContextLoss()})}});return ne(()=>r.isShowAboutModal,o=>{o&&(g||(g=!0,le(()=>{const{init:p}=w(x);p(),R()})))}),F(()=>{}),(o,p)=>($(),N("div",{class:S(["l-about",{isActive:n(r).isShowAboutModal}])},[t("div",{class:"p-about-window-bar"},[be,t("div",{class:"p-about-window-bar-close",onClick:y},ye)]),t("div",Re,[t("div",{class:"webGLbox",ref_key:"mainWebGLbox",ref:x},null,512),t("div",Be,[t("div",Le,[Me,t("div",{class:"p-about-comment-text",ref_key:"CommentText",ref:m},"「今まで買ってきたボロボロのスニーカーを捨てる前に写真を撮っていました。このままストレージの奥底に残るよりはwebの素材として使ってやろうと思いました。Nuxtjsやwebglの勉強もしたかったので」",512)]),Se])])],2))}}),ke={class:"l-content-scroll"},Ee={class:"l-content-wrapper"},Te={class:"l-content-wrapper-inner"},Ke={class:"l-selectCursor"},Fe={__name:"index",setup(A){const r=s(-1),x=re(),m=P();s(null);const l=s(null),f=s(!1),g=s(""),y=s(null),R=s(null),w=s(null),o=s(null);s(!1);const p=s(null),h=s(null),i=s(null),c=s(null),e=s({topLeft:{x:"0",y:"0"},topRight:{x:"0",y:"0"},bottomLeft:{x:"0",y:"0"},bottomRight:{x:"0",y:"0"}});let u;const a=v=>{g.value=v},d=s(!1),B=()=>{const v=o.value.getBoundingClientRect(),W=1,M=v.width*W,k=v.height*W,D=v.left+v.width/2,E=v.top+v.height/2,b={left:D-M/2,right:D+M/2,top:E-k/2,bottom:E+k/2};e.value.topLeft.x=Math.floor(b.left),e.value.topLeft.y=Math.floor(b.top),e.value.topRight.x=Math.floor(b.right),e.value.topRight.y=Math.floor(b.top),e.value.bottomLeft.x=Math.floor(b.left),e.value.bottomLeft.y=Math.floor(b.bottom),e.value.bottomRight.x=Math.floor(b.right),e.value.bottomRight.y=Math.floor(b.bottom);const U=[y,R,w];d.value=U.some((I,X)=>{const T=I.value.container.getBoundingClientRect(),j={x:(T.right-T.left)/2+T.left,y:(T.bottom-T.top)/2+T.top};let O=!1;return b.top<j.y&&j.y<b.bottom&&(I.value.sendTitle(),I.value.animationPlay(),O=!0,r.value=X),O||(r.value=-1,g.value=""),O})},L=()=>{window.scrollY===0&&(u.style.backgroundColor=x.baseColor)},C=()=>{if(!l.value)return;const v=l.value.getBoundingClientRect();f.value=v.top<=0};return F(()=>{window.addEventListener("scroll",C),B(),window.addEventListener("scroll",B),window.addEventListener("scroll",L),u=document.getElementById("l-wrapper")}),G(()=>{window.removeEventListener("scroll",L),window.removeEventListener("scroll",C)}),ue(()=>{window.removeEventListener("scroll",B)}),(v,W)=>{const M=we,k=Ae,D=fe,E=me;return $(),N("div",null,[t("div",ke,[K(M),K(k),t("div",Ee,[t("div",Te,[t("div",Ke,[t("div",{class:S(["p-selectCursor",{isDebug:n(m).isDebug}])},[t("div",{class:S(["c-selectCursor",{isDebug:n(m).isDebug}]),ref_key:"selectCursor",ref:o},[t("div",{class:S(["c-selectCursor-pos debugBox",{isActive:n(m).isDebug}])},[t("div",{class:"c-selectCursor-pos-disp -topLeft",ref_key:"selectCursorTopLeft",ref:p}," ("+_(n(e).topLeft.x)+","+_(n(e).topLeft.y)+") ",513),t("div",{class:"c-selectCursor-pos-disp -topRight",ref_key:"selectCursorTopRight",ref:h}," ("+_(n(e).topRight.x)+","+_(n(e).topRight.y)+") ",513),t("div",{class:"c-selectCursor-pos-disp -bottomLeft",ref_key:"selectCursorBottomLeft",ref:i}," ("+_(n(e).bottomLeft.x)+","+_(n(e).bottomLeft.y)+") ",513),t("div",{class:"c-selectCursor-pos-disp -bottomRight",ref_key:"selectCursorBottomRight",ref:c}," ("+_(n(e).bottomRight.x)+","+_(n(e).bottomRight.y)+") ",513)],2),t("div",{class:S(["c-selectCursor-name",{isActive:n(m).isDebug}])}," Touch Area ",2)],2)],2)]),K(D),t("div",{class:S(["debugBox debugShowActiveObjIndex",{isActive:n(m).isDebug}])}," Active Obj index: "+_(n(r)),3),K(E,{ref_key:"Box3D_lo_1",ref:y,modelIndex:"1",title:"NIKE AIR JORDAN 1",cgPath:"/nuxt3/object/sneaker_lo.glb",mainColor:"#473acc",mainColor2:"#3456bb",isActive:n(r)===0,onGetTitle:a},null,8,["isActive"]),K(E,{ref_key:"Box3D_lo_2",ref:R,modelIndex:"2",title:"NIKE DUNK",cgPath:"/nuxt3/object/sneaker_lo_2.glb",mainColor:"#385372",mainColor2:"#646567",isActive:n(r)===1,onGetTitle:a},null,8,["isActive"]),K(E,{ref_key:"Box3D_lo_3",ref:w,modelIndex:"3",title:"OTHERS",cgPath:"/nuxt3/object/sneaker_lo_others.glb",mainColor:"#2f2f2a",mainColor2:"#181810",isActive:n(r)===2,onGetTitle:a},null,8,["isActive"])])])])])}}};export{Fe as default};
