import{I,A as X,r as d,z as V,q as j,o as z,c as J,a as e,W as re,P as H,S as q,T as be,J as xe,y as ae,V as le,M as ie,j as ce,u as we,B as Se,k as ye,s as Ce,C as Le,w as Te,D as se,e as Ee,t as n,x as D,v as o,b as Pe,K as Re,R as Me,N as Ae,E as Ye,F as $e,G as Be,H as Oe,L as ke,O as Fe}from"./vhxvITQ5.js";import{v as We}from"./DMAXLEiR.js";import{v as Ge}from"./C74dAFiS.js";const Ie=window.setInterval,De=I("/images/logo_sneakerarchives1_dummy.png"),He=I("/images/logo_scrolldown.png"),ze=`uniform sampler2D uTexture;
varying vec2 vUv;
uniform vec2 u_resolution;
uniform float uTime;
uniform float u_glitchAmount;

// ノイズ生成関数（擬似ランダム値）
float random(float x) {
    return fract(sin(x) * 43758.5453123);
}
float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
  
void main(void){

    // フラグメントの正規化座標（0.0〜1.0の範囲）
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // テクスチャの色をサンプリング
    vec4 texColor = texture2D(uTexture, uv);
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float n = noise(st * u_resolution.xy + uTime);
    // ノイズを色に適用
    vec3 noiseColor = vec3(n * u_glitchAmount) + vec3(texColor);
    
    // 線のパラメータ
    // ランダムな線の太さを 0.01〜0.02 に設定
    float randValue = random(uv.x);           // ランダムな値を生成
    float lineWidth = mix(0.005, 0.01, randValue);  // 0.01 〜 0.02 の間でランダムに設定


    float speed = 0.5;       // 線の下方向への速度

    // uTimeに基づいてY座標を移動させる
    float lineY = fract(uv.y - uTime * speed);  // 時間で下に移動する線

    // Y座標に基づいて線を描く
    float line = step(1.0 - lineWidth, abs(lineY));

    // 線の色とテクスチャの色を合成
    vec4 lineColor = vec4(1.0, 1.0, 0.0, 1.0); // 赤い線
    // 減算合成: テクスチャの色から線の色を減算
    // vec4 finalColor = texColor - lineColor * line;    

    // 減算合成: テクスチャの色から線の色を減算
    vec4 finalColor = vec4(noiseColor,1.0) - lineColor * line;

    // vec4 finalColor = mix(texColor, lineColor, line);
    if (texColor.a < 0.5) {
        discard;
    }
    // 出力
    gl_FragColor = finalColor;

}`,Ne={class:"l-pageTitle"},Ue={class:"c-pageTitle"},Ve=e("img",{src:De,class:"pageLogoDummy"},null,-1),qe=[Ve],Xe={class:"c-pageTitle-scroll"},wt=X({__name:"PageTitle",setup(Y){const S=d(null);let c=!1;const r=()=>{Ie(function(){S.value&&(c?S.value.style.opacity="0":S.value.style.opacity="1",c=!c)},400)};d(null);const g=d(null);var i,p=!1,m=new V,h=0,f=0;const t=(x,P,R)=>({init:()=>{const v=new re({alpha:!0,antialias:!0});var b=new H(45,window.innerWidth/window.outerWidth,1,2e3);v.setSize(window.innerWidth,window.innerHeight);const u=new q,M=new be;var w=new xe(16777215);u.add(w),i=M.load("/nuxt3/images/logo_sneakerarchives1_s.png",function(s){h=s.image.naturalWidth,f=s.image.naturalHeight,v.setSize(h,f);const _=60,T=_/2*(Math.PI/180),a=f/2/Math.tan(T);b=new H(_,h/f,1,a*2),b.position.z=a,g.value.appendChild(v.domElement),v.domElement.style.width="100%",v.domElement.style.height="auto",$()}),v.debug.onShaderError=(s,_,T,a)=>{s.getShaderSource(T),s.getShaderSource(a),console.groupCollapsed("vertexShader"),console.groupEnd(),console.groupCollapsed("fragmentShader"),console.groupEnd()};function $(){const s=new ae(h,f,1);m=new V({uniforms:{uTime:{value:0},u_resolution:{value:new le(h,f)},uTexture:{value:i},u_glitchAmount:{value:1}},vertexShader:We,fragmentShader:ze});const _=new ie(s,m);u.add(_),p=!0}function B(s){requestAnimationFrame(B),p&&(m.uniforms.uTime.value=s,m.uniforms.u_resolution.value=new le(h,f),m.uniforms.u_glitchAmount.value=.5),v.render(u,b)}B(0),v.render(u,b)}});return j(()=>{const{init:x}=t();x(),r()}),(x,P)=>(z(),J("div",Ne,[e("h2",Ue,[e("div",{ref_key:"pageLogo",ref:g},qe,512)]),e("div",Xe,[e("img",{src:He,ref_key:"logoScrolldown",ref:S},null,512)])]))}}),je={__name:"SneakerName",props:{title:String,isActive:{type:Boolean,default:!1}},setup(Y){const S=d(null),c=Y;let r=!1;ce(()=>c.isActive,i=>{i===!0&&(g(),r=!0)});const g=()=>{if(r)return;S.value.innerHTML="";const i=c.title.split("");var p=[];i.forEach((f,t)=>{const x=document.createElement("span");f==" "&&x.classList.add("nameSpacer"),x.textContent=f,p.push(x)});const m=document.createElement("div");m.classList.add("nameList"),p.forEach((f,t)=>{m.appendChild(p[t])}),S.value.appendChild(m),m.querySelectorAll("span").forEach((f,t)=>{setTimeout(()=>{f.style.display="block"},t*100)})};return(i,p)=>(z(),J("div",{class:"c-sneakerTitle",ref_key:"SneakerName",ref:S},null,512))}},Je=I("/images/MouseOverCursor.png"),Ke=`uniform sampler2D uTexture;
varying vec2 vUv;
// uniform float uPos;
uniform float uPercent;
uniform float uTime;
  
void main(void){
    // 1.シンプルに出力
    // vec4 color = texture2D(uTexture, vUv);
    // gl_FragColor = LinearTosRGB(vec4( color, 1.0 ));
    
    // 2.グレースケールフィルター
    // float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    // gl_FragColor = LinearTosRGB(vec4(vec3(gray), color.a));

    vec2 uv = vUv;

    float moz = uPercent * 0.02;

    if( moz > 0. ) {// 0では割れないので、if文で保護
        uv = floor( uv / moz ) * moz + ( moz * .5 );
    }
    vec4 texColor = texture2D( uTexture, uv );
    // アルファ値が 0 の場合はスキップ
    if (texColor.a < 0.5) {
        discard;
    }
    vec3 color = texColor.rgb;

    gl_FragColor = LinearTosRGB(vec4( color, 1.0 ));

}`,Qe=e("div",{class:"debugWebGLboxTextSS"},"Touching Area:",-1),Ze={class:"debugWebGLboxTextSS"},et=e("img",{src:Je},null,-1),tt=[et],ot={class:"debugWebGLboxRectPosBox --top_l"},nt={class:"debugWebGLboxRectPosBox --top_r"},lt={class:"debugWebGLboxRectPosBox --bottom_l"},st={class:"debugWebGLboxRectPosBox --bottom_r"},rt=e("div",{class:"debugWebGLboxTextS"},"WebGLCanvas",-1),at={class:"debugWebGLboxText"},U=4,it=.05,G=1,St=X({__name:"Box3D_lo_mos",props:{title:String,cgPath:String,mainColor:String,modelIndex:String,isActive:{type:Boolean,default:!1}},setup(Y,{expose:S,emit:c}){const r=d(null),g=d(null),i=Y;let p=G;const m=d(!1),h=d({x:"0",y:"0"}),f=c,t=we(),x=Se();let P=[],R=null,L=null,v=null,b=null,u=null,M=null,w,$=null,B=!1;const s=d(!1),_=d(!1);let T=null,a=null;const A=()=>{f("getTitle",i.title)},ue=()=>{B||R&&R.forEach(l=>{const y=new Oe(w),C=y.clipAction(l);C.setLoop(ke,0),C.clampWhenFinished=!0,C.play(),P.push(y),B=!0})},de=()=>{se.to(w.rotation,{y:Math.PI*6,duration:.5,repeat:0,ease:"power1.inOut",onComplete:function(){}}),se.to(w.scale,{x:0,y:.5,z:0,duration:.5,repeat:0,ease:"power1.inOut"}),t.showPage(Number(i.modelIndex))},ve=()=>{i.title&&i.cgPath&&t.addComponent(i.title,i.cgPath,Number(i.modelIndex))};let O;const me=l=>{l.forEach(y=>{y.isIntersecting&&x.setMainColor(`${i.mainColor}`)})},fe=()=>{T=new IntersectionObserver(me,{root:null,rootMargin:"-50% 0px",threshold:0}),r.value&&T.observe(r.value)},ge=(l,y,C)=>({init:()=>{a=new re({alpha:!0,antialias:!1});const W=256,k=192;L=new Re(W,k,{format:Me,colorSpace:Ae}),a.setPixelRatio(1),a.setSize(W,k),a.setClearColor(0,0),l.value.appendChild(a.domElement),v=new q,v.background=null,b=new H(45,W/k,.1,70),b.position.set(2,2,2.5),b.lookAt(new Ye(0,1.1,0)),u=new q,u.background=null;const te=60,pe=te/2*(Math.PI/180),_e=k/2/Math.tan(pe);M=new H(te,W/k,1,_e*2),M.position.z=200;const he=new ae(W,k);O=new V({uniforms:{uPercent:{value:U},uTexture:{value:L.texture}},vertexShader:Ge,fragmentShader:Ke,transparent:!0});const oe=new ie(he,O);oe.material.transparent=!0,u.add(oe);const N=new $e(16777215);N.intensity=4,N.position.set(2,2,1),v.add(N),new Be().load(`${i.cgPath}`,F=>{w=F.scene,w.position.set(0,1.4,0),v.add(w),ve(),R=F.animations},void 0,function(F){console.error(F)});const ne=()=>{$=requestAnimationFrame(ne),P.forEach(F=>F.update(.01)),(s.value||_.value)&&(p-=it),s.value&&(p<0&&(O.uniforms.uPercent.value-=G,p=G),O.uniforms.uPercent.value<=0&&(O.uniforms.uPercent.value=0,s.value=!1)),_.value&&(p<0&&(O.uniforms.uPercent.value+=G,p=G),O.uniforms.uPercent.value>=U&&(O.uniforms.uPercent.value=U,_.value=!1)),m.value?(w.rotation.y+=.01,i.isActive||(s.value=!0,_.value=!1)):i.isActive||(s.value=!1,_.value=!0),a&&(a.setRenderTarget(L),a.clear(),a.render(v,b),a.setRenderTarget(null),a.clear(),a.render(u,M))};ne()}}),K=()=>{if(!r.value)return;const l=r.value.getBoundingClientRect(),y=l.left+l.width/2,C=l.top+l.height/2;h.value.x=Math.floor(y).toString(),h.value.y=Math.floor(C).toString(),m.value&&t.setMouseOverRect(l.left,l.top,l.right,l.top,l.left,l.bottom,l.right,l.bottom)},Q=l=>{if(m.value=!0,!g.value)return;g.value.style.display="block";const y=l.clientX-16,C=l.clientY-16;g.value.style.left=`${y}px`,g.value.style.top=`${C}px`;const E=r.value.getBoundingClientRect();t.setMouseOverRect(E.left,E.top,E.right,E.top,E.left,E.bottom,E.right,E.bottom)},Z=l=>{if(!m.value||!g.value)return;const y=l.clientX-16,C=l.clientY-16;g.value.style.left=`${y}px`,g.value.style.top=`${C}px`},ee=()=>{g.value&&(m.value=!1,g.value.style.display="none",t.switchMouseOver(!1))};return j(()=>{const{init:l}=ge(r);l(),fe(),window.addEventListener("scroll",K),r.value.addEventListener("mousemove",Z),r.value.addEventListener("mouseover",Q),r.value.addEventListener("mouseout",ee)}),ye(()=>{T&&T.unobserve(r.value),r.value.removeEventListener("mousemove",Z),r.value.removeEventListener("mouseover",Q),r.value.removeEventListener("mouseout",ee)}),Ce(()=>{a&&(cancelAnimationFrame($),a.dispose(),a.forceContextLoss()),window.removeEventListener("scroll",K)}),ce(()=>i.isActive,l=>{l?(s.value=!0,_.value=!1):(s.value=!1,_.value=!0)}),S({container:r,sendTitle:A,animationPlay:ue}),(l,y)=>{const C=je,E=Ee;return z(),Le(E,{to:`/sneaker/${Y.modelIndex}`,onClick:de,class:"c-sneaker-list"},{default:Te(()=>[e("div",{class:D(["debugBox posTopLeft",{isActive:o(t).isDebug}])},[Qe,e("div",Ze,n(Y.isActive),1)],2),e("div",{class:D(["webGLbox",{isDebug:o(t).isDebug}]),ref_key:"container",ref:r},null,2),e("div",{class:"webGLboxMouseOverCursor",ref_key:"r_MouseOverCursor",ref:g},tt,512),Pe(C,{isActive:Y.isActive,title:Y.title},null,8,["isActive","title"]),e("div",{class:D(["debugWebGLboxRectPos",{isActive:o(t).isDebug}])},[e("div",ot,[e("div",null," ("+n(Math.floor(o(t).mouseOverRect.top_l.x))+", "+n(Math.floor(o(t).mouseOverRect.top_l.y))+") ",1),e("div",null," ("+n(parseFloat(o(t).mouseOverRectInt.top_l.x.toFixed(4)))+", "+n(parseFloat(o(t).mouseOverRectInt.top_l.y.toFixed(4)))+") ",1)]),e("div",nt,[e("div",null," ("+n(Math.floor(o(t).mouseOverRect.top_r.x))+", "+n(Math.floor(o(t).mouseOverRect.top_r.y))+") ",1),e("div",null," ("+n(parseFloat(o(t).mouseOverRectInt.top_r.x.toFixed(4)))+", "+n(parseFloat(o(t).mouseOverRectInt.top_r.y.toFixed(4)))+") ",1)]),e("div",lt,[e("div",null," ("+n(Math.floor(o(t).mouseOverRect.bottom_l.x))+", "+n(Math.floor(o(t).mouseOverRect.bottom_l.y))+") ",1),e("div",null," ("+n(parseFloat(o(t).mouseOverRectInt.bottom_l.x.toFixed(4)))+", "+n(parseFloat(o(t).mouseOverRectInt.bottom_l.y.toFixed(4)))+") ",1)]),e("div",st,[e("div",null," ("+n(Math.floor(o(t).mouseOverRect.bottom_r.x))+", "+n(Math.floor(o(t).mouseOverRect.bottom_r.y))+") ",1),e("div",null," ("+n(parseFloat(o(t).mouseOverRectInt.bottom_r.x.toFixed(4)))+", "+n(parseFloat(o(t).mouseOverRectInt.bottom_r.y.toFixed(4)))+") ",1)])],2),e("div",{class:D(["debugWebGLboxPos",{isDebug:o(t).isDebug}])},[rt,e("div",at,"("+n(o(h).x)+","+n(o(h).y)+")",1),e("div",null,"isEffectStart: "+n(o(s)),1),e("div",null,"isEffectEnd: "+n(o(_)),1)],2)]),_:1},8,["to"])}}}),ct=I("/images/scroll_arrow_top.png"),ut=I("/images/scroll_arrow_bottom.png"),dt={class:"ScrollBar"},vt=e("img",{src:ct,class:"ScrollBarArrow ScrollBarArrow--top"},null,-1),mt=e("img",{src:ut,class:"ScrollBarArrow ScrollBarArrow--bottom"},null,-1),ft=e("div",{class:"custom-scrollbar-thumb-inner"},null,-1),gt=[ft],pt={class:"debug"},yt=X({__name:"ScrollBar",setup(Y){const S=d(null),c=d(null),r=d(""),g=d(""),i=d(""),p=d(""),m=d(""),h=d(""),f=d(""),t=d(""),x=d("");return j(()=>{const P=document.querySelector(".l-wrapper");if(!P)return;let R=P.scrollHeight,L=window.innerHeight,v=L/R*L,b=window.scrollY,u=b/R*L+15;c.value&&(c.value.style.height=`${v}px`,c.value.style.transform=`translateY(${u}px)`),window.addEventListener("scroll",()=>{M||c.value&&(b=window.scrollY,u=b/R*L,u<15&&(u=15),u>window.innerHeight-v-15&&(u=window.innerHeight-v-15),c.value.style.transform=`translateY(${u}px)`)});let M=!1,w,$,B;c.value&&(c.value.addEventListener("mousedown",s=>{M=!0,w=s.pageY,B=s.clientY,f.value=w.toString(),b=window.scrollY,u=b/R*L,$=window.scrollY,t.value=$.toString(),document.body.style.userSelect="none"}),r.value=P.clientHeight.toString(),g.value=P.scrollHeight.toString(),document.addEventListener("mousemove",s=>{if(M){const _=s.pageY-w,T=s.clientY-B,a=T/window.innerHeight*document.documentElement.scrollHeight;if(window.scrollTo(0,$+a),h.value=s.pageY.toString(),f.value=w.toString(),p.value=_.toString(),m.value=a.toString(),c.value){let A=T/window.innerHeight*L+u;c.value.style.transform=`translateY(${A}px)`,x.value=A.toString(),A<15&&(A=15,c.value.style.transform=`translateY(${A}px)`,x.value=u.toString()),A>window.innerHeight-v-15&&(A=window.innerHeight-v-15,c.value.style.transform=`translateY(${A}px)`,x.value=u.toString())}}}),document.addEventListener("mouseup",()=>{M=!1,document.body.style.userSelect=""}))}),(P,R)=>(z(),J(Fe,null,[e("div",dt,[vt,mt,e("div",{ref_key:"customScrollbar",ref:S,class:"custom-scrollbar"},[e("div",{ref_key:"scrollbarThumb",ref:c,class:"custom-scrollbar-thumb"},gt,512)],512)]),e("div",pt,[e("div",null,"高さ: "+n(o(r)),1),e("div",null,"スクロール高さ: "+n(o(g)),1),e("div",null,"イベント名: "+n(o(i)),1),e("div",null,"deltaY: "+n(o(p)),1),e("div",null,"debug_scrollDelta: "+n(o(m)),1),e("div",null,"debug_pageY: "+n(o(h)),1),e("div",null,"debug_startY: "+n(o(f)),1),e("div",null,"debug_startScrollTop: "+n(o(t)),1),e("div",null,"debug_thumbPosition: "+n(o(x)),1)])],64))}});export{St as _,wt as a,yt as b};
