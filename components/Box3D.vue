<template>
  <div class="main">
    <div class="pageTitle rainbow-text font-bit">
      <p class="loop">MY SNEAKER’S HISTORY & ARCHIVES</p>
      <p class="loop loop2">MY SNEAKER’S HISTORY & ARCHIVES</p>
    </div>
    <div class="webGLbox" ref="container"></div>
    <div class="sizeSticker">
      <div class="jan-code"><img src="/images/jan_3110241464916 1.svg"/></div>
      <div class="sizeListWrap">
        <div class="sizeListName">SAITOTSUSHIN</div>
        <div class="sizeListBox">
          <div class="sizeList sizeUS">
            <div class="sizeName sizeUS_name">US</div>
            <div class="sizeNumb sizeUS_number">9.5</div>
          </div>
          <div class="sizeList sizeJP">
            <div class="sizeName sizeJP_name">CM</div>
            <div class="sizeNumb sizeJP_number">27.5</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.pageTitle{
  overflow: hidden;
  position: absolute;
  top: calc(50% -  7vw);
  left: 0;
  width: 180%;
  z-index: 10;
  margin-inline: auto;
  font-size: 8vw;
  font-weight: bold;
  white-space: nowrap;
}
.rainbow-text {
  /* color: #F15928; */
  mix-blend-mode: difference;
  font-size: 12vw;
  animation: rainbow 3s infinite;
  line-height: 1;
}
@keyframes rainbow {
    0% { color: red; }
    16% { color: orange; }
    33% { color: yellow; }
    50% { color: green; }
    66% { color: blue; }
    83% { color: indigo; }
    100% { color: violet; }
}


.loop {
  animation: loop 12s linear infinite;
  width: 100%;
}

.loop2{
  position: absolute;
  top: 0; left: 0;
  animation: loop 12s -6s linear infinite;
}

@keyframes loop {
  0%{
    transform: translateX(100%);
  }
  100%{
    transform: translateX(-100%);
  }
}
.main{
  width: 100%;
  background-color: #F15928;
  position: relative;
  .webGLbox{
    position: relative;
    width: 100%;
    max-width: 640px;
    height: 480px;
    margin: auto;
    z-index: 1;
    pointer-events: none;
  }
  .webGLbox canvas{
    width: 100% !important;
    height: auto !important;
    pointer-events: none;
  }  
}


</style>
<script setup lang="ts">
import {
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  ACESFilmicToneMapping, Scene, SphereGeometry, Vector3, WebGLRenderer, AmbientLight, SpotLight, Object3D,
  DirectionalLight,
  type Object3DEventMap
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// import { ref } from 'vue'
const container: Ref<HTMLElement> = ref(null!);
// const { clientWidth, clientHeight } = useWindowSize()

const useSphere = (container: Ref<HTMLElement>, clientWidth: number, clientHeight: number) => {
  const init = () => {
    // レンダラー作成
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true
    })
    // サイズを取得
    // const width = window.innerWidth;
    // const height = window.innerHeight;
    const width = 640;
    const height = 480;    

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = ACESFilmicToneMapping;

    renderer.toneMappingExposure = 1;

    container.value.appendChild(renderer.domElement)
    // シーン追加
    const scene = new Scene();
    // カメラの作成
    const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 6);
    camera.lookAt(new Vector3(0, 1, 0));

    // 環境光
    const ambientLight = new AmbientLight(0xF15928, 1);
    scene.add(ambientLight);

    // 光源
    // const spotLight = new SpotLight(0xffffff, 0.7);
    // spotLight.position.set(0, 0, 0);
    // scene.add(spotLight);

    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.intensity = 4; // 光の強さを倍に
    directionalLight.position.set(0, 2, 1); // ライトの方向
    scene.add(directionalLight);
    
    // GLTFモデルの読み込み
    const loader = new GLTFLoader();
    let model: Object3D<Object3DEventMap>;
    loader.load('/nuxt3/object/sneaker_box2.glb', (gltf) => {
      model = gltf.scene;
      model.position.set(0, 1.4,0);
      scene.add(model);
    }, undefined, function (e) {
      console.error(e);
    });   
    // 毎フレーム時に実行されるループイベント
    const tick = () => {
      requestAnimationFrame(tick)
      // 球体を回転
      if (model) {
        model.rotation.y += 0.01;
      }
      // レンダリング
      renderer.render(scene, camera)
      
    }
    tick()
    renderer.render(scene, camera)
    // コンテキスト削除
    onUnmounted(() => {
      renderer.dispose()
      renderer.forceContextLoss()
    })
  }
  return { init }
}
onMounted(() => {
  const { init } = useSphere(container, 500, 500)
  init()
})
</script>
