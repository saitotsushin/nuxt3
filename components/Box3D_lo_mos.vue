<template>
  <NuxtLink :to="`/sneaker/${modelIndex}`" @click="showPage" class="c-sneaker-list">
    <div>{{ isActive }}</div>
    <div class="webGLbox" ref="container"></div>
  </NuxtLink>
</template>

<script setup lang="ts">
import {
  PerspectiveCamera,
  Scene,Vector3, WebGLRenderer,Object3D,
  DirectionalLight,
  AnimationMixer,
  WebGLRenderTarget,
  LoopOnce,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  type Object3DEventMap,
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { bool } from 'three/examples/jsm/nodes/Nodes.js';
import gsap from 'gsap';
// 外部ファイルからシェーダーをインポート
import vertexShader from '~/assets/shaders/mosiac2_vs.glsl?raw';
import fragmentShader from '~/assets/shaders/mos_fs.glsl?raw';    


const container: Ref<HTMLElement> = ref(null!);

const props = defineProps({
  title: String,    // 親コンポーネントから渡される title プロップ
  cgPath: String, // 親コンポーネントから渡される cgPath プロップ
  mainColor: String,
  modelIndex: String,
  isActive: {
    type: Boolean,
    default: false
  }
})
const mosPer = 4.0;
const mosClearSpeed = 0.05;
const mosStepTime = 1.0;
let saveMosTime = mosStepTime;
let isEffect = false;

const emit = defineEmits()

// Piniaのストアインスタンスを取得
const componentStore = useComponentStore()

const website = useWebsiteStore()

// DOM要素への参照を作成
// const elementARef = ref(null)
let mixers: AnimationMixer[] = [];
let clips: any[] | null = null;

// オフスクリーンレンダリングには欠かせないレンダーターゲットを作ります
let renderTarget: any | null = null;
let scene: any | null = null;
let camera: any | null = null;
  
let offScene: any | null = null;
let offCamera: any | null = null;
  
let model: Object3D<Object3DEventMap>;

let isAnimePlay = false;

let isEffectStart = false;
let isEffectEnd = false;

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

const showPage = () => {
  // GSAPを使ってメッシュのY軸の回転をアニメーション
  gsap.to(model.rotation, {
    y: Math.PI * 6, // 2π（1回転）
    duration: 0.5, // 2秒で回転
    repeat: 0,  // 無限ループ
    ease: "power1.inOut", // イージング
    onComplete: function () {
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
let mat: any;
    
const handleIntersect = (entries: any[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      website.setMainColor(`${props.mainColor}`);
    } else {
    }
  });
}

const checkInDisplay = () => {
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
    const width = 256;
    const height = 192;    
    renderTarget = new WebGLRenderTarget(width, height);

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    // renderer.setClearColor(0x000000, 0);

    container.value.appendChild(renderer.domElement)

    // シーン追加
    scene = new Scene();
    // カメラの作成
    camera = new PerspectiveCamera(45, width / height, 0.1, 70);
    camera.position.set(2, 2, 4);
    camera.lookAt(new Vector3(0, 1.4, 0));

    //オフスクリーンレンダリング用のシーンとカメラ
    offScene = new Scene();

    // 視野角をラジアンに変換
    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = (height / 2) / Math.tan(fovRad);
    offCamera = new PerspectiveCamera(fov, width / height, 1, dist * 2);
    offCamera.position.z = dist;// カメラを遠ざける

    //スクリーン用の平面
    const geo = new PlaneGeometry(width, height); // 板ポリをウィンドウぴったりにするために２×２
    mat = new ShaderMaterial({
      uniforms: {
        // uTime: { value: 0.0 },
        uPercent: {value: mosPer},
        uTexture:{value:renderTarget.texture}
      },
      vertexShader: vertexShader, // 頂点シェーダー
      fragmentShader: fragmentShader, // フラグメントシェーダー
    });
    // texture.colorSpace = SRGBColorSpace
    const plane = new Mesh(geo, mat);

    offScene.add(plane)

    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.intensity = 4; // 光の強さを倍に
    directionalLight.position.set(2, 2, 1); // ライトの方向
    scene.add(directionalLight);
    // const light = new AmbientLight(0xffffff, 1.0);
    // scene.add(light);


    // GLTFモデルの読み込み
    const loader = new GLTFLoader();
    
    loader.load(`${props.cgPath}`, (gltf) => {
      model = gltf.scene;
      model.position.set(0, 1.4,0);
      scene.add(model);
      duplicateComponent();

      // 各オブジェクトのアニメーションを管理
      clips = gltf.animations;

    }, undefined, function (e) {
      console.error(e);
    });   

    // 毎フレーム時に実行されるループイベント
    const tick = () => {
      requestAnimationFrame(tick)
      // アニメーションを更新
      mixers.forEach(mixer => mixer.update(0.01));
      if (isEffectStart || isEffectEnd) {
        saveMosTime -= mosClearSpeed;
      }
      if (isEffectStart) {
        isEffect = true;
        if (saveMosTime - mosClearSpeed < 0) {
          mat.uniforms.uPercent.value -= mosStepTime;
          saveMosTime = mosStepTime;
        }
        if (mat.uniforms.uPercent.value == 0) {
          mat.uniforms.uPercent.value = 0;
          isEffectStart = false;
        }
      }
      if (isEffectEnd) {
        if (saveMosTime - mosClearSpeed < 0) {
          mat.uniforms.uPercent.value += mosStepTime;
          saveMosTime = mosStepTime;
        }
        if (mat.uniforms.uPercent.value == mosPer) {
          mat.uniforms.uPercent.value = mosPer;
          isEffectEnd = false;
        }        
      }    


      // uniforms.uTexture = renderTarget.texture;

      renderer.setRenderTarget(renderTarget);
      // renderer.setClearColor(0xf5f542);
      renderer.clear(); // クリアを行う
      renderer.render(scene, camera);

      renderer.setRenderTarget(null); // レンダーターゲットを解除します
      renderer.clear();

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
})
onBeforeUnmount(() => {
});
watch(() => props.isActive, (newValue) => {
  if (newValue) {
    isEffectStart = true;
    isEffectEnd = false
    // ここで必要な処理を行うことができます
  } else {
    isEffectStart = false;
    isEffectEnd = true;
  }
  
});
// 親コンポーネントにこの参照を公開
defineExpose({
  container,
  sendTitle,
  animationPlay
})
</script>
