<template>
  <div class="webGLbox" ref="container"></div>
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

// DOM要素への参照を作成
// const elementARef = ref(null)

// import { ref } from 'vue'
const container: Ref<HTMLElement> = ref(null!);
// const { clientWidth, clientHeight } = useWindowSize()

const props = defineProps({
  title: String,    // 親コンポーネントから渡される title プロップ
  cgPath: String // 親コンポーネントから渡される cgPath プロップ
})
const emit = defineEmits()

// タイトルを親に送信する関数
const sendTitle = () => {
  console.log("sendTitle");
  emit('getTitle', props.title) // titleを親に送信
}
// 親コンポーネントにこの参照を公開
defineExpose({
  container,
  sendTitle
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
  console.log("scrollPercentage", scrollPercentage);

  // スクロール位置を取得
  targetScrollY = document.documentElement.scrollTop;

  // currentScrollY = window.scrollY;

  // リープ関数でスクロール位置をなめらかに追従
  currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);

  scrollOffset = targetScrollY - currentScrollY;

  if (currentScrollY > lastScrollY) {
    console.log('スクロールダウン'); // 下にスクロール
  } else {
    console.log('スクロールアップ',scrollOffset); // 上にスクロール
  }
  scrollSpeed = ((currentScrollY - lastScrollY) / docHeight);
  lastScrollY = currentScrollY;

  // スクロール中の状態を更新
  if (isScrolling) {
    clearTimeout(isScrolling);
  }
  isScrolling = setTimeout(() => {
    console.log('スクロールしていない');
    isScrolling = null; // タイマーIDをリセット
  }, 300); // 300ms後にスクロールが止まったと判断
};
// const onScroll = () => {
//   const scrollTop = window.scrollY;
//   const docHeight = document.body.scrollHeight - window.innerHeight;
//   scrollPercentage = scrollTop / docHeight;
//   console.log("scrollPercentage", scrollPercentage);
//   const currentScrollY = window.scrollY;

//   if (currentScrollY > lastScrollY) {
//     console.log('スクロールダウン'); // 下にスクロール
//   } else {
//     console.log('スクロールアップ'); // 上にスクロール
//   }

//   lastScrollY = currentScrollY;  
// }
const lerp = (start:number, end:number, t:number) => {
  return start + (end - start) * t;
}

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
    const scene = new Scene();
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
    
    // GLTFモデルの読み込み
    const loader = new GLTFLoader();
    let model: Object3D<Object3DEventMap>;
    loader.load(`${props.cgPath}`, (gltf) => {
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
        // if (isScrolling) {
        //   camera.rotation.x += scrollSpeed; // 0から2πの範囲に制限;
        //   model_now_rot_z = camera.rotation.x;
        // } else {
        //   console.log("何もしない1 model_now_rot_z="+model_now_rot_z+"/scrollSpeed="+scrollSpeed);
        //   if (camera.rotation.x == 0) {
        //     console.log("何もしない_2");
        //   } else {
        //     if (model_now_rot_z > 0) {
        //       camera.rotation.x -= Math.abs(scrollSpeed);
        //       if (camera.rotation.x < 0) {
        //         camera.rotation.x = 0;
        //       }
        //     }
        //     if (model_now_rot_z < 0) {
        //       camera.rotation.x += Math.abs(scrollSpeed);
        //       if (camera.rotation.x > 0) {
        //         camera.rotation.x = 0;
        //       }
        //     }
        //   }
        //   // model.rotation.y += 0.01;
        // }  
        // model.rotation.y += 0.01;
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
  window.addEventListener('scroll', onScroll);
  lastScrollY = window.scrollY;
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>
