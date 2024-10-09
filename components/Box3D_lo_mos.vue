<template>
  <NuxtLink :to="`/sneaker/${modelIndex}`" @click="showPage" class="c-sneaker-list">
    <div class="webGLbox" ref="container"></div>
  </NuxtLink>
</template>

<script setup lang="ts">
import {
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  ACESFilmicToneMapping, Scene, SphereGeometry, Vector3, WebGLRenderer, AmbientLight, SpotLight, Object3D,
  DirectionalLight,
  AnimationMixer,
  WebGLRenderTarget,
  LoopOnce,
  RGBAFormat,
  UnsignedByteType,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  PointLight,

  type Object3DEventMap,
  Texture,
  WebGLMultipleRenderTargets
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { bool } from 'three/examples/jsm/nodes/Nodes.js';
import gsap from 'gsap';
// 外部ファイルからシェーダーをインポート
import vertexShader from '~/assets/shaders/mosiac2_vs.glsl?raw';
import fragmentShader from '~/assets/shaders/mos_fs.glsl?raw';    

// DOM要素への参照を作成
// const elementARef = ref(null)
let mixers: AnimationMixer[] = [];
let clips: any[] | null = null;

  // オフスクリーンレンダリングには欠かせないレンダーターゲットを作ります
let renderTarget: any | null = null;
let offScene: any | null = null;
let offCamera: any | null = null;
  
let model: Object3D<Object3DEventMap>;

let isAnimePlay = false;

// import { ref } from 'vue'
const container: Ref<HTMLElement> = ref(null!);
// const { clientWidth, clientHeight } = useWindowSize()

const props = defineProps({
  title: String,    // 親コンポーネントから渡される title プロップ
  cgPath: String, // 親コンポーネントから渡される cgPath プロップ
  mainColor: String,
  modelIndex: Number
})
const emit = defineEmits()

// タイトルを親に送信する関数
const sendTitle = () => {
  emit('getTitle', props.title) // titleを親に送信
}
const animationPlay = () => {
  if (isAnimePlay) {
    return;
  }
  // アニメーションクリップをループして、それぞれのアニメーションミキサーを作成
  if (clips) {
    clips.forEach((clip) => {
      const mixer = new AnimationMixer(model);
      const action = mixer.clipAction(clip);
      // ループモードを無効にする
      action.setLoop(LoopOnce,0);

      // アニメーションの終了後に停止する
      action.clampWhenFinished = true;
      action.play();
      mixers.push(mixer);  // 複数のアニメーションミキサーを保持
      isAnimePlay = true;
    });             
  }
}
// 親コンポーネントにこの参照を公開
defineExpose({
  container,
  sendTitle,
  animationPlay
})

// Piniaのストアインスタンスを取得
const componentStore = useComponentStore()

const website = useWebsiteStore()

const showPage = () => {
  // GSAPを使ってメッシュのY軸の回転をアニメーション
  gsap.to(model.rotation, {
    y: Math.PI * 6, // 2π（1回転）
    duration: 0.5, // 2秒で回転
    repeat: 0,  // 無限ループ
    ease: "power1.inOut", // イージング
    onComplete: function () {
      console.log("右の要素の回転完了")
    }
  });
  
  // 大きさ（スケール）をアニメーション
  gsap.to(model.scale, {
    x: 0,
    z: 0,   // Z軸方向に2倍
    duration: 0.5, // 2秒でスケール変更
    repeat: 0,  // 無限ループ
    // yoyo: true,  // スケールを戻す
    ease: "power1.inOut"
  });  
  componentStore.showPage(Number(props.modelIndex));
}
  // sampleComponentAを複製する関数
const duplicateComponent = () => {
  if (props.title && props.cgPath) {
    componentStore.addComponent(props.title, props.cgPath,Number(props.modelIndex));
  }
}
var texture: any;
var uniforms = {
  uPos: 20.0,
  uTime: 0.0,
  uTexture: texture
}
    
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

  // currentScrollY = window.scrollY;

  // リープ関数でスクロール位置をなめらかに追従
  currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);

  scrollOffset = targetScrollY - currentScrollY;

  if (currentScrollY > lastScrollY) {
    // スクロールダウン
  } else {
    // スクロールアップ
  }
  scrollSpeed = ((currentScrollY - lastScrollY) / docHeight);
  lastScrollY = currentScrollY;

  // スクロール中の状態を更新
  if (isScrolling) {
    clearTimeout(isScrolling);
  }
  isScrolling = setTimeout(() => {
    // スクロールしていない
    isScrolling = null; // タイマーIDをリセット
  }, 300); // 300ms後にスクロールが止まったと判断
};
// const onScroll = () => {
//   const scrollTop = window.scrollY;
//   const docHeight = document.body.scrollHeight - window.innerHeight;
//   scrollPercentage = scrollTop / docHeight;
//   const currentScrollY = window.scrollY;

//   if (currentScrollY > lastScrollY) {
//     //下にスクロール
//   } else {
//     // 上にスクロール
//   }

//   lastScrollY = currentScrollY;  
// }
const lerp = (start:number, end:number, t:number) => {
  return start + (end - start) * t;
}
const handleIntersect = (entries: any[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      website.setMainColor(`${props.mainColor}`);
    } else {
    }
  });
}

const checkInDisplay = () => {
  // const h = window.innerHeight * -1 + 60;
  const observer = new IntersectionObserver(handleIntersect, {
    root: null, // ビューポートを基準とする
    rootMargin: '-50% 0px', // 上部20%をトリガー領域に設定
    threshold: 0 // 0%表示された時点でトリガーする
  });
  if (container.value) {
    observer.observe(container.value);
  }    
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
    renderTarget = new WebGLRenderTarget(width, height,{
      format: RGBAFormat,
  type: UnsignedByteType,
  depthBuffer: true,
  stencilBuffer: true     
    });

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    container.value.appendChild(renderer.domElement)
    // シーン追加
    const scene = new Scene();
    // カメラの作成
    const camera = new PerspectiveCamera(45, width / height, 0.1, 70);
    camera.position.set(2, 2, 4);
    camera.lookAt(new Vector3(0, 1.4, 0));

    //オフスクリーンレンダリング用のシーンとカメラ
    offScene = new Scene();
    // 視野角をラジアンに変換
    // offCamera = new PerspectiveCamera(45, width / height, 0.1, 70);
    const fov    = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = (height / 2) / Math.tan(fovRad);
    offCamera = new PerspectiveCamera(fov, width / height, 1, dist * 2);
    offCamera.position.z = dist;// カメラを遠ざける

    // offCamera.position.set(2, 2, 4);
    // offCamera.lookAt(new Vector3(0, 1.4, 0));

    //スクリーン用の平面
    // const geo = new PlaneGeometry(2, 2, 1); // 板ポリをウィンドウぴったりにするために２×２
    const geo = new PlaneGeometry(width, height, 1); // 板ポリをウィンドウぴったりにするために２×２
    const mat = new ShaderMaterial({
      uniforms: {
        uTime: {value: 0.0},
        uPos:{value: uniforms.uPos},
        uTexture:{value:renderTarget.texture}
      },
      vertexShader: vertexShader, // 頂点シェーダー
      fragmentShader: fragmentShader, // フラグメントシェーダー
    });
    const plane = new Mesh(geo, mat);

    offScene.add(plane)

    // 環境光
    const ambientLight = new AmbientLight(0xffffff, 0.3);
    offScene.add(ambientLight);

    // 光源
    // const spotLight = new SpotLight(0xffffff, 0.7);
    // spotLight.position.set(0, 0, 0);
    // scene.add(spotLight);

    // ライトを２種類作ります
    // const ambientLight = new AmbientLight(0xffffff);
    // scene.add(ambientLight);

    // const directionalLight = new DirectionalLight(0xffffff, 1.0);
    // directionalLight.position.set(-1, 2, 2);
    // scene.add(directionalLight);
      
    // const pointLight = new PointLight(0xffffff, 1, 10); // 色、強度、距離
    // pointLight.position.set(2, 3, 5); // 光源の位置
    // scene.add(pointLight);
    
    // const directionalLight = new DirectionalLight(0xffffff);
    // directionalLight.intensity = 8; // 光の強さを倍に
    // directionalLight.position.set(0, 4, 1); // ライトの方向
    // scene.add(directionalLight);

    // const directionalLight2 = new DirectionalLight(0xffffff);
    // directionalLight2.intensity = 1; // 光の強さを倍に
    // directionalLight2.position.set(3, 4, 10); // ライトの方向

    // offScene.add(directionalLight2);
    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.intensity = 4; // 光の強さを倍に
    directionalLight.position.set(0, 2, 1); // ライトの方向
    scene.add(directionalLight);

    const directionalLight2 = new DirectionalLight(0xffffff);
    directionalLight2.intensity = 4; // 光の強さを倍に
    directionalLight2.position.set(0, 2, 1); // ライトの方向
    offScene.add(directionalLight2);

    // GLTFモデルの読み込み
    const loader = new GLTFLoader();
    
    loader.load(`${props.cgPath}`, (gltf) => {
      model = gltf.scene;
      model.position.set(0, 1.4,0);
      scene.add(model);
      // let clone = model.clone();
      // offScene.add(clone);
      duplicateComponent();

      // 各オブジェクトのアニメーションを管理
      clips = gltf.animations;

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
        //   if (camera.rotation.x == 0) {
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
      // アニメーションを更新
      mixers.forEach(mixer => mixer.update(0.01));

      // uniforms.uTexture = renderTarget.texture;

      renderer.setRenderTarget(renderTarget);
      renderer.setClearColor(0xf5f542);
      renderer.clear(); // クリアを行う
      renderer.render(scene, camera);

      renderer.setRenderTarget(null); // レンダーターゲットを解除します
      // renderer.setClearColor(0x000000); // 背景色(今回は無くてもいい)

      renderer.render(offScene, offCamera)
      
    }
    tick()
    // renderer.render(scene, camera)
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
  checkInDisplay()
  window.addEventListener('scroll', onScroll);
  lastScrollY = window.scrollY;
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>
