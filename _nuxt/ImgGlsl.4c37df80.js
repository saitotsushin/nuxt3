import{ac as A,E as y,ad as T,j as C,af as G,ag as U,ah as b,w as E}from"./three.module.63a2f103.js";import{C as M,r as k,n as L,o as l,c as R,_ as u,z as W}from"./entry.81e82fb2.js";const j=M({__name:"ImgGlsl",setup(d){const o=k(null),r=(n,m,z)=>({init:()=>{const e=new A({alpha:!0,antialias:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1),n.value.appendChild(e.domElement);var a=new y(50,window.innerWidth/window.innerHeight,1,1e3);a.position.set(0,0,10);const t=new T,p=new C;var v=new G(16777215);t.add(v);const s={uTexture:{value:p.load("/nuxt3/images/product/images.jpg")},uImageAspect:{value:1920/1280},uPlaneAspect:{value:800/500},uTime:{value:0}},_=new U(2,1.4),g=`
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
      `,f=`
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
      `,x=new b({uniforms:s,vertexShader:g,fragmentShader:f}),h=new E(_,x);t.add(h),e.debug.onShaderError=(c,V,w,S)=>{const P=c.getShaderSource(w),I=c.getShaderSource(S);console.groupCollapsed("vertexShader"),console.log(P),console.groupEnd(),console.groupCollapsed("fragmentShader"),console.log(I),console.groupEnd()};function i(){requestAnimationFrame(i),s.uTime.value++,e.render(t,a)}i(),e.render(t,a)}});return L(()=>{const{init:n}=r(o);n()}),(n,m)=>(l(),R("div",{class:"webGL_glsi_box",ref_key:"container",ref:o},null,512))}});const q=u(j,[["__scopeId","data-v-4783366c"]]),B={};function H(d,o){const r=q;return l(),W(r)}const K=u(B,[["render",H]]);export{K as default};
