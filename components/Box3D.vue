<template>
  <div class="webGLbox" ref="container"></div>
</template>
<style scoped>
html{
  width: 100%;
  height: 100vh;
}
.webGLbox{
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
import { Line, LineBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,AmbientLight,SpotLight, Object3D, type Object3DEventMap } from 'three'
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
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.innerWidth / window.innerHeight)
    
    container.value.appendChild(renderer.domElement)
    // シーン追加
    const scene = new Scene()
    // カメラ作成
    // const camera = new PerspectiveCamera(45, clientWidth / clientHeight)
    // camera.position.set(20, 20, 20)
    // camera.lookAt(new Vector3(0, 0, 0))
    // 球体作成
    const geometry = new SphereGeometry(10, 32, 32)
    const material = new LineBasicMaterial({ color: 0x6699ff, linewidth: 1 })
    const sphere = new Line(geometry, material)
    scene.add(sphere)
    // カメラの作成
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 4);
    camera.lookAt(new Vector3(0, 1, 0));

    // 環境光
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 光源
    const spotLight = new SpotLight(0xffffff, 0.7);
    spotLight.position.set(-10, 10, 10);
        scene.add(spotLight);

    // GLTFモデルの読み込み
    const loader = new GLTFLoader();
    let model: Object3D<Object3DEventMap>;
    loader.load('/nuxt3/object/face01.gltf', (gltf) => {
      model = gltf.scene;
      scene.add(model);
    }, undefined, function (e) {
      console.error(e);
    });   
    // 毎フレーム時に実行されるループイベント
    const tick = () => {
      requestAnimationFrame(tick)
      // 球体を回転
      if (model) {
        model.rotation.x += 0.01;
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
