import{m as P,r as A,h as I,o as l,c as T,W as y,P as U,S as b,T as C,A as G,k as M,l as k,M as E,_ as u,g as W}from"./seE0ligh.js";const L=P({__name:"ImgGlsl",setup(d){const o=A(null),r=(n,m,H)=>({init:()=>{const e=new y({alpha:!0,antialias:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1),n.value.appendChild(e.domElement);var a=new U(50,window.innerWidth/window.innerHeight,1,1e3);a.position.set(0,0,10);const t=new b,p=new C;var v=new G(16777215);t.add(v);const i={uTexture:{value:p.load("/nuxt3/images/product/images.jpg")},uImageAspect:{value:1920/1280},uPlaneAspect:{value:800/500},uTime:{value:0}},f=new M(2,1.4),g=`
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
      `,x=new k({uniforms:i,vertexShader:g,fragmentShader:_}),h=new E(f,x);t.add(h),e.debug.onShaderError=(c,F,w,S)=>{c.getShaderSource(w),c.getShaderSource(S),console.groupCollapsed("vertexShader"),console.groupEnd(),console.groupCollapsed("fragmentShader"),console.groupEnd()};function s(){requestAnimationFrame(s),i.uTime.value++,e.render(t,a)}s(),e.render(t,a)}});return I(()=>{const{init:n}=r(o);n()}),(n,m)=>(l(),T("div",{class:"webGL_glsi_box",ref_key:"container",ref:o},null,512))}}),R=u(L,[["__scopeId","data-v-cf2f2943"]]),q={};function B(d,o){const r=R;return l(),W(r)}const V=u(q,[["render",B]]);export{V as default};
