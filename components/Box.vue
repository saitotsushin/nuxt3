<template>
  <div ref="container"></div>

  <!-- <canvas id="mountId" width="700" height="500" class="m-auto h-[500px] w-[700px] rounded-md" /> -->
</template>

<script setup lang="ts">
import { Line, LineBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer } from 'three'

// import { ref } from 'vue'

const container: Ref<HTMLElement> = ref(null!);
// const { clientWidth, clientHeight } = useWindowSize()

const useSphere = (container: Ref<HTMLElement>, clientWidth: number, clientHeight: number) => {
  const init = () => {
    // レンダラー作成
    const renderer = new WebGLRenderer()
    renderer.setSize(clientWidth, clientHeight)
    renderer.setPixelRatio(clientWidth / clientHeight)
    
    container.value.appendChild(renderer.domElement)
    // シーン追加
    const scene = new Scene()
    // カメラ作成
    const camera = new PerspectiveCamera(45, clientWidth / clientHeight)
    camera.position.set(20, 20, 20)
    camera.lookAt(new Vector3(0, 0, 0))
    // 球体作成
    const geometry = new SphereGeometry(10, 32, 32)
    const material = new LineBasicMaterial({ color: 0x6699ff, linewidth: 1 })
    const sphere = new Line(geometry, material)
    scene.add(sphere)
    // 毎フレーム時に実行されるループイベント
    const tick = () => {
      // 球体を回転
      sphere.rotation.x += .01
      sphere.rotation.y += .01
      // レンダリング
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
    // コンテキスト削除
    onUnmounted(() => {
      renderer.dispose()
      renderer.forceContextLoss()
    })
  }
  return { init }
}
onMounted(() => {
  const { init } = useSphere(container, 200, 200)
  init()
})
</script>