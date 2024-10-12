import{q as S,r as A,v as I,o as u,c as T,W as y,P as U,D as b,T as C,N as E,E as G,F as M,M as W,_ as l,y as k}from"./6YmdV6tA.js";const q=S({__name:"ImgGlsl",setup(d){const o=A(null),r=(n,m,D)=>({init:()=>{const e=new y({alpha:!0,antialias:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1),n.value.appendChild(e.domElement);var a=new U(50,window.innerWidth/window.innerHeight,1,1e3);a.position.set(0,0,10);const t=new b,p=new C;var v=new E(16777215);t.add(v);const i={uTexture:{value:p.load("/nuxt3/images/product/images.jpg")},uImageAspect:{value:1920/1280},uPlaneAspect:{value:800/500},uTime:{value:0}},f=new G(2,1.4),g=`
        varying vec2 vUv;
        uniform float uTime;

        float PI = 3.1415926535897932384626433832795;

        void main(){
          vUv = uv;
          vec3 pos = position;

          float offset = 3.0;
          float freq = 0.05;
          float amp = 0.05;
          pos.x = pos.x + sin(pos.y * offset + uTime * freq * PI ) * amp;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,_=`
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float uImageAspect;
        uniform float uPlaneAspect;

        void main(){
          // 画像のアスペクトとプレーンオブジェクトのアスペクトを比較し、短い方に合わせる
          vec2 ratio = vec2(
            min(uPlaneAspect / uImageAspect, 1.0),
            min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
          );

          // 計算結果を用いてテクスチャを中央に配置
          vec2 fixedUv = vec2(
            (vUv.x - 0.5) * ratio.x + 0.5,
            (vUv.y - 0.5) * ratio.y + 0.5
          );

          vec3 texture = texture2D(uTexture, fixedUv).rgb;
          gl_FragColor = vec4(texture, 1.0);
        }      
      `,x=new M({uniforms:i,vertexShader:g,fragmentShader:_}),h=new W(f,x);t.add(h),e.debug.onShaderError=(c,j,w,P)=>{c.getShaderSource(w),c.getShaderSource(P),console.groupCollapsed("vertexShader"),console.groupEnd(),console.groupCollapsed("fragmentShader"),console.groupEnd()};function s(){requestAnimationFrame(s),i.uTime.value++,e.render(t,a)}s(),e.render(t,a)}});return I(()=>{const{init:n}=r(o);n()}),(n,m)=>(u(),T("div",{class:"webGL_glsi_box",ref_key:"container",ref:o},null,512))}}),L=l(q,[["__scopeId","data-v-cf2f2943"]]),R={};function B(d,o){const r=L;return u(),k(r)}const N=l(R,[["render",B]]);export{N as default};
