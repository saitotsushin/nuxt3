import{A as x,r as w,q as f,o as h,c as _,W as A,P,S as T,T as y,J as I,y as S,z as U,M as b,_ as G}from"./vhxvITQ5.js";const W=x({__name:"ImgGlsl2",setup(C){const i=w(null),s=(t,c,L)=>({init:()=>{const e=new A({alpha:!0,antialias:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1),t.value.appendChild(e.domElement);var a=new P(50,window.innerWidth/window.innerHeight,1,1e3);a.position.set(0,0,10);const n=new T,u=new y;var l=new I(16777215);n.add(l);const r={uTexture:{value:u.load("/nuxt3/images/product/images.jpg")},uImageAspect:{value:1920/1280},uPlaneAspect:{value:800/500},uTime:{value:0}},d=new S(2,1.4),m=`
        varying vec2 vUv;
        uniform float uTime;
        void main(){
        }      
      `,v=`
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float uImageAspect;
        uniform float uPlaneAspect;
        void main(){
          vec2 ratio = vec2(
            min(uPlaneAspect / uImageAspect, 1.0),
            min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
          );        
          vec2 fixedUv = vec2(
            (vUv.x - 0.5) * ratio.x + 0.5,
            (vUv.y - 0.5) * ratio.y + 0.5
          );

          vec3 texture = texture2D(uTexture, fixedUv).rgb;
          gl_FragColor = vec4(texture, 1.0);          
        }   
      `,p=new U({uniforms:r,vertexShader:m,fragmentShader:v}),g=new b(d,p);n.add(g);function o(){requestAnimationFrame(o),r.uTime.value++,e.render(n,a)}o(),e.render(n,a)}});return f(()=>{const{init:t}=s(i);t()}),(t,c)=>(h(),_("div",{class:"webGL_glsi_box",ref_key:"container",ref:i},null,512))}}),H=G(W,[["__scopeId","data-v-ae846d3c"]]);export{H as default};
