import{H as N,l as ae,r as g,k as H,g as re,o as q,c as le,a as t,W as ie,P as z,S as X,T as we,I as Se,j as ue,V as ne,M as ce,B as de,u as Le,m as Me,q as Te,h as Re,s as Pe,w as Ee,v as se,e as ke,t as r,n as $,i as s,b as Ae,J as Ge,R as Oe,K as Be,x as Fe,D as We,G as Ie,A as De,L as $e}from"./CcqtjR0n.js";import{v as ze}from"./DMAXLEiR.js";import{v as Ne}from"./C74dAFiS.js";const me=N("/images/loading.gif"),Ye=N("/images/logo_sneakerarchives1_dummy.png"),Ue=`uniform sampler2D uTexture;
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

}`,Ve={class:"l-pageTitle"},He={class:"c-pageTitle"},Xe={src:Ye,class:"pageLogoDummy",ref:"pageLogoDummy"},pt=ae({__name:"PageTitle",setup(x){g(null),g(null);const b=g(null),R=g(null);var a,u=!1,m=new H,o=0,l=0;const y=(d,C,e)=>({init:()=>{const h=new ie({alpha:!0,antialias:!0});var w=new z(45,window.innerWidth/window.outerWidth,1,2e3);h.setSize(window.innerWidth,window.innerHeight);const S=new X,P=new we;var E=new Se(16777215);S.add(E),a=P.load("/nuxt3/images/logo_sneakerarchives1_s.png",function(i){o=i.image.naturalWidth,l=i.image.naturalHeight,h.setSize(o,l);const L=60,G=L/2*(Math.PI/180),v=l/2/Math.tan(G);w=new z(L,o/l,1,v*2),w.position.z=v,b.value.appendChild(h.domElement),R.value.style.display="none",h.domElement.style.width="100%",h.domElement.style.height="auto",k()}),h.debug.onShaderError=(i,L,G,v)=>{i.getShaderSource(G),i.getShaderSource(v),console.groupCollapsed("vertexShader"),console.groupEnd(),console.groupCollapsed("fragmentShader"),console.groupEnd()};function k(){const i=new ue(o,l,1);m=new H({uniforms:{uTime:{value:0},u_resolution:{value:new ne(o,l)},uTexture:{value:a},u_glitchAmount:{value:1}},vertexShader:ze,fragmentShader:Ue});const L=new ce(i,m);S.add(L),u=!0}function A(i){requestAnimationFrame(A),u&&(m.uniforms.uTime.value=i,m.uniforms.u_resolution.value=new ne(o,l),m.uniforms.u_glitchAmount.value=.5),h.render(S,w)}A(0),h.render(S,w)}});return re(()=>{const{init:d}=y();d()}),(d,C)=>(q(),le("div",Ve,[t("h2",He,[t("div",{ref_key:"pageLogo",ref:b},[t("img",{src:me,class:"loadingGif",ref_key:"LoadingGif",ref:R},null,512),t("img",Xe,null,512)],512)])]))}}),qe={__name:"SneakerName",props:{title:String,isActive:{type:Boolean,default:!1}},setup(x){const b=g(null),R=x;let a=!1;de(()=>R.isActive,m=>{m===!0&&(u(),a=!0)});const u=()=>{if(a)return;b.value.innerHTML="";const m=R.title.split("");var o=[];m.forEach((d,C)=>{const e=document.createElement("span");d==" "&&e.classList.add("nameSpacer"),e.textContent=d,o.push(e)});const l=document.createElement("div");l.classList.add("nameList"),o.forEach((d,C)=>{l.appendChild(o[C])}),b.value.appendChild(l),l.querySelectorAll("span").forEach((d,C)=>{setTimeout(()=>{d.style.display="block"},C*100)})};return(m,o)=>(q(),le("div",{class:"c-sneakerTitle",ref_key:"SneakerName",ref:b},null,512))}},je=N("/images/dummy_4_3.png"),Je=N("/images/MouseOverCursor.png"),Ke=`uniform sampler2D uTexture;
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

}`,Qe=t("div",{class:"debugWebGLboxTextSS"},"Touching Area:",-1),Ze={class:"debugWebGLboxTextSS"},et={class:"loadingBox"},tt=t("img",{src:je,class:"dummyImg"},null,-1),ot=t("img",{src:Je},null,-1),nt=[ot],st={class:"debugWebGLboxRectPosBox --top_l"},at={class:"debugWebGLboxRectPosBox --top_r"},rt={class:"debugWebGLboxRectPosBox --bottom_l"},lt={class:"debugWebGLboxRectPosBox --bottom_r"},it=t("div",{class:"debugWebGLboxTextS"},"WebGLCanvas",-1),ut={class:"debugWebGLboxText"},V=4,ct=.05,I=1,gt=ae({__name:"Box3D_lo_mos",props:{title:String,cgPath:String,mainColor:String,mainColor2:String,modelIndex:String,isActive:{type:Boolean,default:!1}},setup(x,{expose:b,emit:R}){const a=g(null),u=g(null),m=g(null),o=x;let l=I;const y=g(!1),d=g({x:"0",y:"0"}),C=R,e=Le(),F=Me();let h=[],w=null,S=null,P=null,E=null,k=null,A=null,i,L=null,G=!1;const v=g(!1),M=g(!1);let D=null,c=null;const ve=()=>{C("getTitle",o.title)},fe=()=>{G||w&&w.forEach(n=>{const f=new De(i),p=f.clipAction(n);p.setLoop($e,0),p.clampWhenFinished=!0,p.play(),h.push(f),G=!0})},pe=()=>{se.to(i.rotation,{y:Math.PI*6,duration:.5,repeat:0,ease:"power1.inOut",onComplete:function(){}}),se.to(i.scale,{x:0,y:.5,z:0,duration:.5,repeat:0,ease:"power1.inOut"}),e.setLinkBoxAnimation(!0),e.showPage(Number(o.modelIndex)),F.setMainColor(`${o.mainColor}`),F.setMainColor2(`${o.mainColor2}`)},ge=()=>{o.title&&o.cgPath&&e.addComponent(o.title,o.cgPath,Number(o.modelIndex))};let T,Y,j;const he=n=>{n.forEach(f=>{f.isIntersecting&&Y&&(Y.style.backgroundColor=o.mainColor,j.style.backgroundColor=o.mainColor2,F.setMainColor(`${o.mainColor}`),F.setMainColor2(`${o.mainColor2}`))})},_e=()=>{D=new IntersectionObserver(he,{root:null,rootMargin:"-50% 0px",threshold:0}),a.value&&D.observe(a.value)},xe=(n,f,p)=>({init:()=>{c=new ie({alpha:!0,antialias:!1});const W=256,O=192;S=new Ge(W,O,{format:Oe,colorSpace:Be}),c.setPixelRatio(1),c.setSize(W,O),c.setClearColor(0,0),n.value.appendChild(c.domElement),P=new X,P.background=null,E=new z(45,W/O,.1,70),E.position.set(2,2,2.5),E.lookAt(new Fe(0,1.1,0)),k=new X,k.background=null;const ee=60,be=ee/2*(Math.PI/180),ye=O/2/Math.tan(be);A=new z(ee,W/O,1,ye*2),A.position.z=200;const Ce=new ue(W,O);T=new H({uniforms:{uPercent:{value:V},uTexture:{value:S.texture}},vertexShader:Ne,fragmentShader:Ke,transparent:!0});const te=new ce(Ce,T);te.material.transparent=!0,k.add(te);const U=new We(16777215);U.intensity=4,U.position.set(2,2,1),P.add(U),new Ie().load(`${o.cgPath}`,B=>{i=B.scene,i.position.set(0,1.4,0),P.add(i),ge(),m.value.style.display="none",w=B.animations},void 0,function(B){console.error(B)});const oe=()=>{L=requestAnimationFrame(oe),h.forEach(B=>B.update(.01)),(v.value||M.value)&&(l-=ct),v.value&&(l<0&&(T.uniforms.uPercent.value-=I,l=I),T.uniforms.uPercent.value<=0&&(T.uniforms.uPercent.value=0,v.value=!1)),M.value&&(l<0&&(T.uniforms.uPercent.value+=I,l=I),T.uniforms.uPercent.value>=V&&(T.uniforms.uPercent.value=V,M.value=!1)),y.value?(i.rotation.y+=.01,o.isActive||(v.value=!0,M.value=!1)):o.isActive||(v.value=!1,M.value=!0),c&&(c.setRenderTarget(S),c.clear(),c.render(P,E),c.setRenderTarget(null),c.clear(),c.render(k,A))};oe()}}),J=()=>{if(!a.value)return;const n=a.value.getBoundingClientRect(),f=n.left+n.width/2,p=n.top+n.height/2;d.value.x=Math.floor(f).toString(),d.value.y=Math.floor(p).toString(),y.value&&e.setMouseOverRect(n.left,n.top,n.right,n.top,n.left,n.bottom,n.right,n.bottom)},K=n=>{if(y.value=!0,!u.value)return;e.switchMouseOver(!0),u.value.style.display="block";const f=n.clientX-16,p=n.clientY-16;u.value.style.left=`${f}px`,u.value.style.top=`${p}px`;const _=a.value.getBoundingClientRect();e.setMouseOverRect(_.left,_.top,_.right,_.top,_.left,_.bottom,_.right,_.bottom)},Q=n=>{if(!y.value||!u.value)return;const f=n.clientX-16,p=n.clientY-16;u.value.style.left=`${f}px`,u.value.style.top=`${p}px`},Z=()=>{u.value&&(y.value=!1,u.value.style.display="none",e.switchMouseOver(!1))};return re(()=>{const{init:n}=xe(a);n(),_e(),Y=document.getElementById("l-wrapper"),j=document.getElementById("js-next-display"),window.addEventListener("scroll",J),a.value.addEventListener("mousemove",Q),a.value.addEventListener("mouseover",K),a.value.addEventListener("mouseout",Z)}),Te(()=>{D&&D.unobserve(a.value),a.value.removeEventListener("mousemove",Q),a.value.removeEventListener("mouseover",K),a.value.removeEventListener("mouseout",Z)}),Re(()=>{c&&(cancelAnimationFrame(L),c.dispose(),c.forceContextLoss()),window.removeEventListener("scroll",J)}),de(()=>o.isActive,n=>{n?(v.value=!0,M.value=!1):(v.value=!1,M.value=!0)}),b({container:a,sendTitle:ve,animationPlay:fe}),(n,f)=>{const p=qe,_=ke;return q(),Pe(_,{to:`/sneaker/${x.modelIndex}`,onClick:pe,class:"c-sneaker-list"},{default:Ee(()=>[t("div",{class:$(["debugBox posTopLeft",{isActive:s(e).isDebug}])},[Qe,t("div",Ze,r(x.isActive),1)],2),t("div",{class:$(["webGLbox",{isDebug:s(e).isDebug}]),ref_key:"container",ref:a},[t("div",et,[t("img",{src:me,class:"loadingGif",ref_key:"LoadingGif",ref:m},null,512),tt])],2),t("div",{class:"webGLboxMouseOverCursor",ref_key:"r_MouseOverCursor",ref:u},nt,512),Ae(p,{isActive:x.isActive,title:x.title},null,8,["isActive","title"]),t("div",{class:$(["debugWebGLboxRectPos",{isActive:s(e).isDebug}])},[t("div",st,[t("div",null," ("+r(Math.floor(s(e).mouseOverRect.top_l.x))+", "+r(Math.floor(s(e).mouseOverRect.top_l.y))+") ",1),t("div",null," ("+r(parseFloat(s(e).mouseOverRectInt.top_l.x.toFixed(4)))+", "+r(parseFloat(s(e).mouseOverRectInt.top_l.y.toFixed(4)))+") ",1)]),t("div",at,[t("div",null," ("+r(Math.floor(s(e).mouseOverRect.top_r.x))+", "+r(Math.floor(s(e).mouseOverRect.top_r.y))+") ",1),t("div",null," ("+r(parseFloat(s(e).mouseOverRectInt.top_r.x.toFixed(4)))+", "+r(parseFloat(s(e).mouseOverRectInt.top_r.y.toFixed(4)))+") ",1)]),t("div",rt,[t("div",null," ("+r(Math.floor(s(e).mouseOverRect.bottom_l.x))+", "+r(Math.floor(s(e).mouseOverRect.bottom_l.y))+") ",1),t("div",null," ("+r(parseFloat(s(e).mouseOverRectInt.bottom_l.x.toFixed(4)))+", "+r(parseFloat(s(e).mouseOverRectInt.bottom_l.y.toFixed(4)))+") ",1)]),t("div",lt,[t("div",null," ("+r(Math.floor(s(e).mouseOverRect.bottom_r.x))+", "+r(Math.floor(s(e).mouseOverRect.bottom_r.y))+") ",1),t("div",null," ("+r(parseFloat(s(e).mouseOverRectInt.bottom_r.x.toFixed(4)))+", "+r(parseFloat(s(e).mouseOverRectInt.bottom_r.y.toFixed(4)))+") ",1)])],2),t("div",{class:$(["debugWebGLboxPos",{isDebug:s(e).isDebug}])},[it,t("div",ut,"("+r(s(d).x)+","+r(s(d).y)+")",1),t("div",null,"isEffectStart: "+r(s(v)),1),t("div",null,"isEffectEnd: "+r(s(M)),1)],2)]),_:1},8,["to"])}}});export{gt as _,pt as a};
