import{_ as X,u as P,r as s,h as G,i as F,o as $,c as H,a as t,t as _,j as n,n as M,p as q,f as z,W as V,S as j,P as Z,k as J,l as Q,V as ee,M as te,m as oe,C as ne,E as se,H as ie,O as le,x as ae,D as re,A as ce,G as ue,v as de,q as me,s as ve,b as K}from"./d-9HYnaW.js";import{v as fe}from"./DWoqyjwh.js";import{_ as pe}from"./kxd5cqQI.js";import{_ as he}from"./g1DSCz83.js";import"./DMAXLEiR.js";const _e=`precision mediump float;

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
`,ge=A=>(q("data-v-964ff133"),A=A(),z(),A),we={class:"l-glsl_BgContents"},be=ge(()=>t("div",null,"MOUSE POS",-1)),xe={__name:"BgGlsl",setup(A){const m=P();let x=null,v=null,i=null,f=null,g=null;const y=s(null),R=s(null),w=s({x:0,y:0});let o={x:0,y:0};const p=(a,c,e)=>({init:()=>{i=new V({alpha:!0,antialias:!1});const l=window.innerWidth,r=window.innerHeight;i.setPixelRatio(1),i.setSize(l,r),i.setClearColor(0,0),a.value.appendChild(i.domElement),x=new j;const C=60,T=C/2*(Math.PI/180),L=r/2/Math.tan(T);v=new Z(C,l/r,1,L*2);const u=new J(2,2,10,10);f=new Q({uniforms:{uAspect:{value:window.innerWidth/window.innerHeight},r:{value:new ee(window.innerWidth,window.innerHeight)},uMouse:{value:o},t:{value:0},uIsRectMouseOver:{value:!1}},vertexShader:fe,fragmentShader:_e,transparent:!0});const W=new te(u,f);x.add(W);const B=()=>{if(g=requestAnimationFrame(B),i){i.render(x,v),f.uniforms.uMouse.value=o;const S=performance.now()/1e3;f.uniforms.t.value=S,f.uniforms.uIsRectMouseOver.value=m.isSwitchMouseOver}};B()}}),h=a=>{let c=0,e=0;if(a.type.startsWith("touch")){const r=a.touches[0];o.x=r.clientX,o.y=r.clientY,c=r.clientX,e=r.clientY}else o.x=a.clientX,o.y=a.clientY,c=a.clientX,e=a.clientY;const d=window.innerWidth,l=window.innerHeight;o.x=(c*2-d)/Math.min(d,l),o.y=-(e*2-l)/Math.min(d,l),w.value&&(w.value.x=parseFloat(o.x.toFixed(4)),w.value.y=parseFloat(o.y.toFixed(4)))};return G(()=>{const{init:a}=p(y);a(),window.addEventListener("mousemove",h),window.addEventListener("touchmove",h)}),F(()=>{i&&(cancelAnimationFrame(g),i.dispose(),i.forceContextLoss()),window.removeEventListener("mousemove",h),window.removeEventListener("touchmove",h)}),(a,c)=>($(),H("div",we,[t("div",{class:"glsl_BgContents",ref_key:"BgContents",ref:y},null,512),t("div",{class:M(["glsl_BgContents_debug",{isActive:n(m).isDebug}]),ref_key:"glsl_BgContents_debug",ref:R},[be,t("div",null," x:"+_(n(w).x)+",y:"+_(n(w).y),1)],2)]))}},Ce=X(xe,[["__scopeId","data-v-964ff133"]]),ye=t("div",{class:"p-about-window-bar-title"},"ABOUT",-1),Re=t("span",null,null,-1),Le=t("span",null,null,-1),Be=[Re,Le],Me={class:"p-about-contents"},Ae={class:"c-dotWindow"},Se={class:"p-about-comment"},ke=t("div",{class:"p-about-comment-name"},"サイトウ通信",-1),Ee=se('<div class="c-dotWindow-inner"><div class="c-dotWindow_LeftRight c-dotWindow--dot"></div><div class="c-dotWindow_TopBottom c-dotWindow--dot"></div><div class="c-dotWindow_Top c-dotWindow--dot"></div><div class="c-dotWindow_Bottom c-dotWindow--dot"></div></div>',1),Ke=oe({__name:"About",setup(A){const m=P(),x=s(null),v=s(null);let i,f,g=!1;const y=()=>{m.showAboutModal(!m.isShowAboutModal),m.isShowAboutModal&&(g||(g=!0,R()))},R=()=>{let o=v.value.textContent;v.value.innerHTML="";const p=o==null?void 0:o.split("");var h=[];p==null||p.forEach((e,d)=>{const l=document.createElement("span");let r=e;r==" "?l.classList.add("nameSpacer"):r=="-"?(console.log("word",e),l.classList.add("nameBr")):l.textContent=r,h.push(l)});const a=document.createElement("div");a.classList.add("commentList"),h.forEach((e,d)=>{a.appendChild(h[d])}),v.value.appendChild(a),a.querySelectorAll("span").forEach((e,d)=>{setTimeout(()=>{e.style.display="inline-block"},d*60)})},w=(o,p,h)=>({init:()=>{const c=new V({alpha:!0,antialias:!1}),e=256,d=192;c.setPixelRatio(1),c.setSize(e,d),c.setClearColor(0,0),o.value.appendChild(c.domElement),i=new j;const l=new le(-2*e/d,2*e/d,2,-2,.5,10);l.position.set(0,2,10),l.lookAt(new ae(0,1,0));const r=new re(16777215);r.intensity=4,r.position.set(0,2,1),i.add(r);const C=new ce(16777215,1);i.add(C),new ue().load("/nuxt3/object/chara_4.glb",u=>{f=u.scene,f.position.set(0,1.4,0),i.add(f),de.to(f.position,{y:1,duration:1,repeat:-1,yoyo:!0,ease:"power1.inOut"})},void 0,function(u){console.error(u)});const L=()=>{requestAnimationFrame(L),c.render(i,l)};L(),c.render(i,l),F(()=>{c.dispose(),c.forceContextLoss()})}});return ne(()=>m.isShowAboutModal,o=>{o&&(g||(g=!0,ie(()=>{const{init:p}=w(x);p(),R()})))}),G(()=>{}),(o,p)=>($(),H("div",{class:M(["l-about",{isActive:n(m).isShowAboutModal}])},[t("div",{class:"p-about-window-bar"},[ye,t("div",{class:"p-about-window-bar-close",onClick:y},Be)]),t("div",Me,[t("div",{class:"webGLbox",ref_key:"mainWebGLbox",ref:x},null,512),t("div",Ae,[t("div",Se,[ke,t("div",{class:"p-about-comment-text",ref_key:"CommentText",ref:v},"「今まで買ってきたボロボロのスニーカー。念の為、捨てる前に写真を撮っていました。コーディングの勉強をするために素材に迷っていましたが、過去のスニーカーを写真に撮っていたことを思い出し、せっかくなので素材として使用してみました！」",512)]),Ee])])],2))}}),Te={class:"l-content-scroll"},We={class:"l-content-wrapper"},Oe={class:"l-content-wrapper-inner"},De={class:"l-selectCursor"},Ie={class:"l-sneakerContainer"},Pe=t("div",{class:"c-sneakerArcive-title"},"SNEAKER ARCHIVES",-1),Ve={__name:"index",setup(A){const m=s(-1),x=me(),v=P();s(null);const i=s(null),f=s(!1),g=s(""),y=s(null),R=s(null),w=s(null),o=s(null);s(!1);const p=s(null),h=s(null),a=s(null),c=s(null),e=s({topLeft:{x:"0",y:"0"},topRight:{x:"0",y:"0"},bottomLeft:{x:"0",y:"0"},bottomRight:{x:"0",y:"0"}});let d;const l=u=>{g.value=u},r=s(!1),C=()=>{const u=o.value.getBoundingClientRect(),W=1,B=u.width*W,S=u.height*W,O=u.left+u.width/2,k=u.top+u.height/2,b={left:O-B/2,right:O+B/2,top:k-S/2,bottom:k+S/2};e.value.topLeft.x=Math.floor(b.left),e.value.topLeft.y=Math.floor(b.top),e.value.topRight.x=Math.floor(b.right),e.value.topRight.y=Math.floor(b.top),e.value.bottomLeft.x=Math.floor(b.left),e.value.bottomLeft.y=Math.floor(b.bottom),e.value.bottomRight.x=Math.floor(b.right),e.value.bottomRight.y=Math.floor(b.bottom);const Y=[y,R,w];r.value=Y.some((D,U)=>{const E=D.value.container.getBoundingClientRect(),N={x:(E.right-E.left)/2+E.left,y:(E.bottom-E.top)/2+E.top};let I=!1;return b.top<N.y&&N.y<b.bottom&&(D.value.sendTitle(),D.value.animationPlay(),I=!0,m.value=U),I||(m.value=-1,g.value=""),I})},T=()=>{window.scrollY===0&&(d.style.backgroundColor=x.baseColor)},L=()=>{if(!i.value)return;const u=i.value.getBoundingClientRect();f.value=u.top<=0};return G(()=>{window.addEventListener("scroll",L),C(),window.addEventListener("scroll",C),window.addEventListener("scroll",T),d=document.getElementById("l-wrapper")}),F(()=>{window.removeEventListener("scroll",T),window.removeEventListener("scroll",L)}),ve(()=>{window.removeEventListener("scroll",C)}),(u,W)=>{const B=Ce,S=Ke,O=pe,k=he;return $(),H("div",null,[t("div",Te,[K(B),K(S),t("div",We,[t("div",Oe,[t("div",De,[t("div",{class:M(["p-selectCursor",{isDebug:n(v).isDebug}])},[t("div",{class:M(["c-selectCursor",{isDebug:n(v).isDebug}]),ref_key:"selectCursor",ref:o},[t("div",{class:M(["c-selectCursor-pos debugBox",{isActive:n(v).isDebug}])},[t("div",{class:"c-selectCursor-pos-disp -topLeft",ref_key:"selectCursorTopLeft",ref:p}," ("+_(n(e).topLeft.x)+","+_(n(e).topLeft.y)+") ",513),t("div",{class:"c-selectCursor-pos-disp -topRight",ref_key:"selectCursorTopRight",ref:h}," ("+_(n(e).topRight.x)+","+_(n(e).topRight.y)+") ",513),t("div",{class:"c-selectCursor-pos-disp -bottomLeft",ref_key:"selectCursorBottomLeft",ref:a}," ("+_(n(e).bottomLeft.x)+","+_(n(e).bottomLeft.y)+") ",513),t("div",{class:"c-selectCursor-pos-disp -bottomRight",ref_key:"selectCursorBottomRight",ref:c}," ("+_(n(e).bottomRight.x)+","+_(n(e).bottomRight.y)+") ",513)],2),t("div",{class:M(["c-selectCursor-name",{isActive:n(v).isDebug}])}," Touch Area ",2)],2)],2)]),K(O),t("div",{class:M(["debugBox debugShowActiveObjIndex",{isActive:n(v).isDebug}])}," Active Obj index: "+_(n(m)),3),t("div",Ie,[Pe,K(k,{ref_key:"Box3D_lo_1",ref:y,modelIndex:"1",title:"NIKE AIR JORDAN 1",cgPath:"/nuxt3/object/sneaker_lo.glb",mainColor:"#473acc",mainColor2:"#3456bb",isActive:n(m)===0,onGetTitle:l},null,8,["isActive"]),K(k,{ref_key:"Box3D_lo_2",ref:R,modelIndex:"2",title:"NIKE DUNK",cgPath:"/nuxt3/object/sneaker_lo_2.glb",mainColor:"#385372",mainColor2:"#646567",isActive:n(m)===1,onGetTitle:l},null,8,["isActive"]),K(k,{ref_key:"Box3D_lo_3",ref:w,modelIndex:"3",title:"OTHERS",cgPath:"/nuxt3/object/sneaker_lo_others.glb",mainColor:"#2f2f2a",mainColor2:"#181810",isActive:n(m)===2,onGetTitle:l},null,8,["isActive"])])])])])])}}};export{Ve as default};
