<template>
    <div class="l-pageTitle">
      <h2 class="c-pageTitle">
        <div ref="pageLogo"></div>
      </h2>
      <div class="c-pageTitle-scroll">
        <img src="/images/logo_scrolldown.png" ref="logoScrolldown"/>
      </div>
    </div>
</template>
<script setup lang="ts">
const logoScrolldown: Ref<HTMLElement> = ref(null!);
let switchScrollDownShow = false;
const ScrollAnime = () => {
  const intervalId = setInterval(function () {
    if (logoScrolldown.value) {
      if (!switchScrollDownShow){
        logoScrolldown.value.style.opacity = "1";
      } else {
        logoScrolldown.value.style.opacity = "0";
      }
      switchScrollDownShow = !switchScrollDownShow;
    }
  }, 400); // 1000ミリ秒 (1秒) ごとに繰り返し実行
}

import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer, AmbientLight,
  TextureLoader,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
  Mesh
} from 'three'
// 外部ファイルからシェーダーをインポート
import vertexShader from '~/assets/shaders/default_vs.glsl?raw';
import fragmentShader from '~/assets/shaders/noise_fs3.glsl?raw';    

const container: Ref<HTMLElement> = ref(null!);
const pageLogo: Ref<HTMLElement> = ref(null!);
var texture: any;
var pos: any;
var isActive = false;
var mat = new ShaderMaterial();
var uniforms = {
  uPos: 20.0,
  uTime: 0.0,
  uTexture: texture
} 
var w = 0;
var h = 0;
const useSphere = (container: Ref<HTMLElement>, clientWidth: number, clientHeight: number) => {
  const init = () => {
    // レンダラー作成
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true
    })


    var camera = new PerspectiveCamera(45, window.innerWidth / window.outerWidth, 1, 2000);
    renderer.setSize(window.innerWidth,window.innerHeight);

    const scene = new Scene();
    const loader = new TextureLoader();
    var light = new AmbientLight(0xffffff);
    scene.add(light);
    texture = loader.load('/nuxt3/images/logo_sneakerarchives1_s.png',
      function (texture) {
        // テクスチャがロードされた後に呼び出されるコールバック
        // テクスチャの画像データから幅と高さを取得
        w = texture.image.naturalWidth;
        h = texture.image.naturalHeight;

        renderer.setSize(w, h);
        // renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);        

        // 視野角をラジアンに変換
        const fov    = 60;
        const fovRad = (fov / 2) * (Math.PI / 180);
        const dist = (h / 2) / Math.tan(fovRad);
        camera = new PerspectiveCamera(fov, w / h, 1, dist * 2);
        // camera = new PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1,dist * 2);

        camera.position.z = dist;// カメラを遠ざける

        pageLogo.value.appendChild(renderer.domElement);

        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "auto";

        SetPlaneGeometry();

      },
    );        

    renderer.debug.onShaderError = ( gl, program, vertexShader, fragmentShader ) => {

      const vertexShaderSource = gl.getShaderSource( vertexShader );
      const fragmentShaderSource = gl.getShaderSource( fragmentShader );
      
      console.groupCollapsed( "vertexShader" )
      console.groupEnd()
      
      console.groupCollapsed( "fragmentShader" )
      console.groupEnd()

    }
    function SetPlaneGeometry() {
      console.log("w="+w+"/h="+h)
      const geo = new PlaneGeometry(w, h, 1);
      // const geo = new PlaneGeometry(window.innerWidth, window.innerHeight, 1);
      uniforms.uTexture = texture;

      mat = new ShaderMaterial({
        uniforms: {
          uTime: {value: 0.0},
          u_resolution:{value: new Vector2(w,h)},
          uTexture: { value: texture },
          u_glitchAmount: { value: 1.0 }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      });

      const mesh = new Mesh(geo, mat);      
      scene.add(mesh);
      isActive = true;
    }

    function render(time: number) {
      requestAnimationFrame(render);
      if (isActive) {
        // mat.uniforms.uPos.value = 20.0;
        mat.uniforms.uTime.value = time;
        mat.uniforms.u_resolution.value = new Vector2(w, h)
        mat.uniforms.u_glitchAmount.value = 0.5
      }
      renderer.render(scene, camera);
    }
    render(0);
    renderer.render(scene, camera);
    
  }
  return { init }
}
onMounted(() => {
  const { init } = useSphere(container, 500, 500);
  init()
  ScrollAnime();
})

</script>
