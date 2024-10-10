import{F as C,q as M,r as w,B as x,v as R,o as U,c as B,a as E,W,P as _,S as A,T as G,K as L,A as k,M as F}from"./BJ_ANt-V.js";const j=C("/images/thumb/3.jpg"),q=`  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,z=`uniform sampler2D uTexture;
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
}`,K=M({__name:"mono",setup(D){const m=w(null),g=w(null);var a,f=!1,t=new x,h={uPos:20,uTime:0,uTexture:a};let i=0;const S=(s,P,H)=>({init:()=>{const n=new W({alpha:!0,antialias:!0});g.value.getBoundingClientRect();var l=0,o=0,u=new _(45,window.innerWidth/window.outerWidth,1,2e3);const c=new A,y=new G;var b=new L(16777215);c.add(b),a=y.load("/nuxt3/images/thumb/3.jpg",function(e){l=e.image.naturalWidth,o=e.image.naturalHeight,n.setSize(l,o),n.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1);const r=60,v=r/2*(Math.PI/180),d=o/2/Math.tan(v);u=new _(r,l/o,1,d*2),u.position.z=d,s.value.appendChild(n.domElement),n.domElement.style.width="100%",T()}),n.debug.onShaderError=(e,r,v,d)=>{e.getShaderSource(v),e.getShaderSource(d),console.groupCollapsed("vertexShader"),console.groupEnd(),console.groupCollapsed("fragmentShader"),console.groupEnd()};function T(){const e=new k(l,o,1);h.uTexture=a,t=new x({uniforms:{uTime:{value:0},uPos:{value:h.uPos},uTexture:{value:a}},vertexShader:q,fragmentShader:z});const r=new F(e,t);c.add(r),f=!0}function p(e){requestAnimationFrame(p),f&&(t.uniforms.uPos.value=20,i=e*1e-4,i>1&&(i=1),t.uniforms.uTime.value=i),n.render(c,u)}p(0),n.render(c,u)}});return R(()=>{const{init:s}=S(m);s()}),(s,P)=>(U(),B("div",{class:"webGL_glsi_box",ref_key:"container",ref:m},[E("img",{src:j,ref_key:"thumb",ref:g},null,512)],512))}});export{K as default};
