<template>
  <div class="webGL_glsi_box" ref="container"></div>  
</template>

<style scoped>
.webGL_glsi_box{
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  pointer-events: none;
}
canvas{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
}
</style>
  <script setup lang="ts">
  import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer, AmbientLight, SpotLight, Object3D, type Object3DEventMap,
    TextureLoader,
    PlaneGeometry,
    ShaderMaterial,
    Mesh,
    MeshPhongMaterial
} from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  
  const container: Ref<HTMLElement> = ref(null!);
  
  const useSphere = (container: Ref<HTMLElement>, clientWidth: number, clientHeight: number) => {
    const init = () => {
      // レンダラー作成
      const renderer = new WebGLRenderer({
        alpha: true,
        antialias: true
      })
      // renderer.setClearColor(0xffffff,1);
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
      
      container.value.appendChild(renderer.domElement)
      var camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(0, 0, 10);

      const scene = new Scene();
      const loader = new TextureLoader();
      var light = new AmbientLight(0xffffff);
      scene.add(light);
      const texture = loader.load('/nuxt3/images/product/images.jpg');
      const uniforms = {
        uTexture: { value: texture },
        uImageAspect: { value: 1920 / 1280 }, // 画像のアスペクト
        uPlaneAspect: { value: 800 / 500 }, // プレーンのアスペクト,
        uTime: { value: 0 }, // 時間経過
      };
      const geo = new PlaneGeometry(2,1.4);
      const vertexShader = `
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
      `;
      const fragmentShader = `
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
      `;
      const mat = new ShaderMaterial({
        uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      });

      const mesh = new Mesh(geo, mat);      
      scene.add(mesh);
      renderer.debug.onShaderError = ( gl, program, vertexShader, fragmentShader ) => {
  
        const vertexShaderSource = gl.getShaderSource( vertexShader );
        const fragmentShaderSource = gl.getShaderSource( fragmentShader );
        
        console.groupCollapsed( "vertexShader" )
        console.groupEnd()
        
        console.groupCollapsed( "fragmentShader" )
        console.groupEnd()

      }
      function render() {
          requestAnimationFrame(render);
          uniforms.uTime.value++;
          renderer.render(scene, camera);
      }
      render();

      renderer.render(scene, camera);
      
    }
    return { init }
  }
  onMounted(() => {
    const { init } = useSphere(container, 500, 500)
    init()
  })
  </script>