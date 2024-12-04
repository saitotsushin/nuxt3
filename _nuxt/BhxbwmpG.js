import{_ as C}from"./BfyxekQ6.js";import{_ as P}from"./D4D-49a8.js";import{r as c,l as _,h as L,I as G,c as M,a as r,o as U,W,P as w,S as k,T as D,A as E,k as b,v as F,M as I}from"./seE0ligh.js";import{v as z}from"./C74dAFiS.js";const B=`varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uProgress;
uniform float uTime;
uniform float uAnimation;

void main() {

  // vec4 color = texture2D(uTexture,vec2(vUv.x,abs(sin(uTime * 0.1))));

  vec4 color1 = texture2D(uTexture,vUv);
  vec4 color2 = texture2D(uTexture,vec2(uAnimation,vUv.y));
  vec4 final = mix(color2,color1,step(vUv.x,uAnimation));

  // gl_FragColor = vec4(vUv,uProgress,1.);
  // gl_FragColor = color;
  gl_FragColor = final;
}`,H={class:"l-pageTitle"},N={class:"c-pageTitle"},R={src:P,class:"pageLogoDummy",ref:"pageLogoDummy"},J={__name:"Shader",setup(X){const m=c(null),d=c(null),v=c(null);var f,g=!1,i=new _,s=0,o=0;const x=()=>({init:()=>{const e=new W({alpha:!0,antialias:!0});var n=new w(45,window.innerWidth/window.outerWidth,1,2e3);e.setSize(window.innerWidth,window.innerHeight);const a=new k,S=new D;var y=new E(16777215);a.add(y),f=S.load("/nuxt3/images/10-6--thumb.png",function(t){s=t.image.naturalWidth,o=t.image.naturalHeight,e.setSize(s,o);const u=60,A=u/2*(Math.PI/180),p=o/2/Math.tan(A);n=new w(u,s/o,1,p*2),n.position.z=p,d.value.appendChild(e.domElement),v.value.style.display="none",e.domElement.style.width="100%",e.domElement.style.height="auto",T()});function T(){const t=new b(s,o,1);i=new _({uniforms:{uTime:{value:0},uAnimation:{value:0},uProgress:{value:0},uTexture:{value:f}},vertexShader:z,fragmentShader:B}),F.to(i.uniforms.uAnimation,{value:1,duration:10});const u=new I(t,i);a.add(u),g=!0}function h(t){requestAnimationFrame(h),g&&(i.uniforms.uTime.value=t),e.render(a,n)}h(0),e.render(a,n)}});return L(()=>{const{init:l}=x();l();const{$dat:e}=G(),n=new e.GUI({autoPlace:!1});m.value.appendChild(n.domElement);const a={rotationX:0};n.add(a,"rotationX",0,Math.PI*2)}),(l,e)=>(U(),M("div",H,[r("div",{ref_key:"guiContainer",ref:m,class:"guiContainer"},null,512),r("h2",N,[r("div",{ref_key:"pageLogo",ref:d},[r("img",{src:C,class:"loadingGif",ref_key:"LoadingGif",ref:v},null,512),r("img",R,null,512)],512)])]))}};export{J as default};
