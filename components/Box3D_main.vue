<template>
  <div class="webGLbox" ref="mainWebGLbox"></div>
</template>

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
import { bool } from 'three/examples/jsm/nodes/Nodes.js';
import gsap from 'gsap';

// import { ref } from 'vue'
const mainWebGLbox: Ref<HTMLElement> = ref(null!);
// const { clientWidth, clientHeight } = useWindowSize()
// 親コンポーネントにこの参照を公開
defineExpose({
  mainWebGLbox
})

let scrollPercentage = 0;
let isScrolling: NodeJS.Timeout | null = null; // スクロール中かどうかのフラグ
let lastScrollY = 0;
let start:number = 0;
let end:number = 10;
const t:number = 0.5;
let targetScrollY = 0; // 本来のスクロール位置
let currentScrollY = 0; // 線形補間を適用した現在のスクロール位置
let scrollOffset = 0; // 上記2つの差分
let scrollSpeed = 0;
let model_now_rot_z = 0;
const onScroll = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  scrollPercentage = scrollTop / docHeight;
  // スクロール位置を取得
  targetScrollY = document.documentElement.scrollTop;

  // リープ関数でスクロール位置をなめらかに追従
  currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);

  scrollOffset = targetScrollY - currentScrollY;

  if (currentScrollY > lastScrollY) {
  } else {
  }
  scrollSpeed = ((currentScrollY - lastScrollY) / docHeight);
  lastScrollY = currentScrollY;

  // スクロール中の状態を更新
  if (isScrolling) {
    clearTimeout(isScrolling);
  }
  isScrolling = setTimeout(() => {
    isScrolling = null; // タイマーIDをリセット
  }, 300); // 300ms後にスクロールが止まったと判断
};
// const onScroll = () => {
//   const scrollTop = window.scrollY;
//   const docHeight = document.body.scrollHeight - window.innerHeight;
//   scrollPercentage = scrollTop / docHeight;
//   const currentScrollY = window.scrollY;

//   if (currentScrollY > lastScrollY) {
// 下にスクロール
//   } else {
// 上にスクロール
//   }

//   lastScrollY = currentScrollY;  
// }

const models: Object3D<Object3DEventMap>[] = [];

const lerp = (start:number, end:number, t:number) => {
  return start + (end - start) * t;
}
const componentStore = useComponentStore()

let scene: Object3D<Object3DEventMap>;
let activeModel: Object3D<Object3DEventMap>;
// Piniaストアの特定の状態を監視する
watch(
  () => componentStore.cdPath, // 監視する状態
  (newValue, oldValue) => {
    // 状態が変更されたらこの関数が呼ばれる
    add3D(newValue,false,componentStore.modelIndex);
  }
)
watch(
  () => componentStore.showModelIndex, // 監視する状態
  (newValue, oldValue) => {
    // 状態が変更されたらこの関数が呼ばれる
    switch3D(componentStore.showModelIndex);
  }  
);

const useSphere = (container: Ref<HTMLElement>, clientWidth: number, clientHeight: number) => {
  const init = () => {
    // レンダラー作成
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: false
    })
    // サイズを取得
    // const width = window.innerWidth;
    // const height = window.innerHeight;
    const width = 256;
    const height = 192;    

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    // renderer.toneMapping = ACESFilmicToneMapping;

    // renderer.toneMappingExposure = 1;

    container.value.appendChild(renderer.domElement)
    // シーン追加
    scene = new Scene();
    // カメラの作成
    const camera = new PerspectiveCamera(45, width / height, 0.1, 70);
    camera.position.set(0, 3, 4);
    camera.lookAt(new Vector3(0, 1, 0));

    // 環境光
    // const ambientLight = new AmbientLight(0xF15928, 1);
    // scene.add(ambientLight);

    // 光源
    // const spotLight = new SpotLight(0xffffff, 0.7);
    // spotLight.position.set(0, 0, 0);
    // scene.add(spotLight);

    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.intensity = 4; // 光の強さを倍に
    directionalLight.position.set(0, 2, 1); // ライトの方向
    scene.add(directionalLight);

    add3D('/nuxt3/object/sneaker_box2.glb',true,0);

    // 毎フレーム時に実行されるループイベント
    const tick = () => {
      requestAnimationFrame(tick)
      // 球体を回転
      if (activeModel) {
        activeModel.rotation.y += 0.01;
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
const add3D = (_cdPath: string, _isShow: boolean, _modelIndex: number) => {
  if (componentStore.firstMounted) {
    return;
  }
  // GLTFモデルの読み込み
  const loader = new GLTFLoader();
  let model: Object3D<Object3DEventMap>;
  loader.load(_cdPath, (gltf) => {
    model = gltf.scene;
    model.position.set(0, 1.4, 0);
    model.userData.modelIndex = _modelIndex;
    scene.add(model);
    models.push(model);
    if (_isShow) {
      activeModel = model;
    }else{
      model.visible = false;
    }
  }, undefined, function (e) {
    console.error(e);
  });   
}
const switch3D = (_showModelIndex: number) => {
  models.forEach((element) => {
    // 各要素に対して実行する処理
    if (element.userData.modelIndex == _showModelIndex) {
      element.rotation.y = 0;
      // 大きさ（スケール）をアニメーション
      gsap.to(activeModel.scale, {
        x: 0,
        y: 0,
        z: 0,   // Z軸方向に2倍
        duration: 0.5, // 2秒でスケール変更
        repeat: 0,  // 無限ループ
        // yoyo: true,  // スケールを戻す
        ease: "power1.inOut",
        onComplete: function () {
        },
      });  
      element.visible = true
      element.scale.set(0, 0, 0)
      gsap.to(element.rotation, {
        y: Math.PI * 6, // 2π（1回転）
        duration: 0.5, // 2秒で回転
        repeat: 0,  // 無限ループ
        ease: "power1.inOut" // イージング
      });
      // 大きさ（スケール）をアニメーション
      gsap.to(element.scale, {
        x: 1,
        y: 1,
        z: 1,   // Z軸方向に2倍
        duration: 0.5, // 2秒でスケール変更
        repeat: 0,  // 無限ループ
        // yoyo: true,  // スケールを戻す
        ease: "power1.inOut"
      });            


      activeModel = element;
      // element.visible = true
    } else {
      // element.visible = false      
    }
  });
} 
    
onMounted(() => {
  const { init } = useSphere(mainWebGLbox, 500, 500)
  init()
  window.addEventListener('scroll', onScroll);
  lastScrollY = window.scrollY;
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>
