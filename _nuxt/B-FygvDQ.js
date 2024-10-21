import{I as C,A as R,r as w,z as x,q as E,o as M,c as W,a as A,W as B,P as _,S as G,T as L,J as U,y as k,M as z}from"./vhxvITQ5.js";import{v as F}from"./DMAXLEiR.js";const j=C("/images/thumb/3.jpg"),q=`uniform sampler2D uTexture;
varying vec2 vUv;
// uniform float uPos;
uniform float uTime;
  
void main(void){
    vec4 color = texture2D(uTexture, vUv);
    
    // RGBからグレースケールへの変換
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayscale = vec3(gray);

    // エフェクトの進行具合に応じて白黒に変わる
    // エフェクトの強さをY座標に基づいて設定
    // vUv.y は0.0が画面の下、1.0が画面の上を表すので、逆にする
    float gradient = mix(0.0, 1.0, vUv.y - uTime);
    vec3 finalColor = mix(color.rgb,grayscale,gradient);

//    gl_FragColor = vec4(finalColor, color.a);

    gl_FragColor = vec4(finalColor, color.a);
}`,V=R({__name:"mono",setup(D){const v=w(null),g=w(null);var a,f=!1,t=new x,h={uPos:20,uTime:0,uTexture:a};let i=0;const S=(s,y,H)=>({init:()=>{const n=new B({alpha:!0,antialias:!0});g.value.getBoundingClientRect();var l=0,r=0,u=new _(45,window.innerWidth/window.outerWidth,1,2e3);const c=new G,P=new L;var b=new U(16777215);c.add(b),a=P.load("/nuxt3/images/thumb/3.jpg",function(e){l=e.image.naturalWidth,r=e.image.naturalHeight,n.setSize(l,r),n.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1);const o=60,m=o/2*(Math.PI/180),d=r/2/Math.tan(m);u=new _(o,l/r,1,d*2),u.position.z=d,s.value.appendChild(n.domElement),n.domElement.style.width="100%",T()}),n.debug.onShaderError=(e,o,m,d)=>{e.getShaderSource(m),e.getShaderSource(d),console.groupCollapsed("vertexShader"),console.groupEnd(),console.groupCollapsed("fragmentShader"),console.groupEnd()};function T(){const e=new k(l,r,1);h.uTexture=a,t=new x({uniforms:{uTime:{value:0},uPos:{value:h.uPos},uTexture:{value:a}},vertexShader:F,fragmentShader:q});const o=new z(e,t);c.add(o),f=!0}function p(e){requestAnimationFrame(p),f&&(t.uniforms.uPos.value=20,i=e*1e-4,i>1&&(i=1),t.uniforms.uTime.value=i),n.render(c,u)}p(0),n.render(c,u)}});return E(()=>{const{init:s}=S(v);s()}),(s,y)=>(M(),W("div",{class:"webGL_glsi_box",ref_key:"container",ref:v},[A("img",{src:j,ref_key:"thumb",ref:g},null,512)],512))}});export{V as default};
