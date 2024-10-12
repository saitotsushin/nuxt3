<template>
  <NuxtLink :to="`/sneaker/${modelIndex}`" @click="showPage" class="c-sneaker-list">
    <div class="debugBox posTopLeft" :class="{ 'isActive': componentStore.isDebug }">
      <div class="debugWebGLboxTextSS">Touching Area:</div>
      <div class="debugWebGLboxTextSS">{{ isActive }}</div>
    </div>
    
    <div class="webGLbox" ref="container" :class="{ 'isDebug': componentStore.isDebug }">
      <div class="webGLboxCursor" :class="{ 'isMouseOver': isMouseOver}">
        <img src="/images/ObjectCursor1.png" class="webGLboxCursorArrow -pos1"/>
        <img src="/images/ObjectCursor2.png" class="webGLboxCursorArrow -pos2"/>
        <img src="/images/ObjectCursor3.png" class="webGLboxCursorArrow -pos3"/>
        <img src="/images/ObjectCursor4.png" class="webGLboxCursorArrow -pos4"/>
        <div class="webGLboxCursorBg" 
          ref="r_webGLboxCursor"
          :style="{ backgroundSize: contentsSize.w + 'px ' + contentsSize.h + 'px' }"></div>
      </div>
    </div>
    <div class="webGLboxMouseOverCursor" ref="r_MouseOverCursor"><img src="/images/MouseOverCursor.png"/></div>
    <SneakerName :isActive="isActive" :title="title"/>
    <div class="debugWebGLboxPos" :class="{ 'isDebug': componentStore.isDebug }">
      <div class="debugWebGLboxTextS">WebGLCanvas</div>
      <div class="debugWebGLboxText">({{ webGLPos.x }},{{ webGLPos.y }})</div>      
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import {
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  Object3D,
  DirectionalLight,
  AnimationMixer,
  WebGLRenderTarget,
  LoopOnce,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  RGBAFormat,
  SRGBColorSpace,
  type Object3DEventMap,
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
// 外部ファイルからシェーダーをインポート
import vertexShader from '~/assets/shaders/mosiac2_vs.glsl?raw';
import fragmentShader from '~/assets/shaders/mos_fs.glsl?raw';    
// import Sneaker from '~/layouts/sneaker.vue';

const container: Ref<HTMLElement> = ref(null!);
const r_webGLboxCursor: Ref<HTMLElement> = ref(null!);
const r_MouseOverCursor: Ref<HTMLElement> = ref(null!);

const contentsSize = ref({
  w: 0,
  h: 0
})

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

const isMouseOver = ref(false);

const webGLPos = ref({
  x: "0",
  y: "0"
});

const emit = defineEmits()

// Piniaのストアインスタンスを取得
const componentStore = useComponentStore()

const website = useWebsiteStore()

// DOM要素への参照を作成
let mixers: AnimationMixer[] = [];
let clips: any[] | null = null;

// オフスクリーンレンダリングには欠かせないレンダーターゲットを作る
let renderTarget: any | null = null;
let scene: any | null = null;
let camera: any | null = null;
  
let offScene: any | null = null;
let offCamera: any | null = null;
  
let model: Object3D<Object3DEventMap>;
let animationId: any | null = null;

let isAnimePlay = false;

let isEffectStart = false;
let isEffectEnd = false;
let observer: IntersectionObserver | null = null;
let renderer: WebGLRenderer | null = null;

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
    y: 0.5,
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
  observer = new IntersectionObserver(handleIntersect, {
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
    renderer = new WebGLRenderer({
      alpha: true,
      antialias: false
    })
    
    // サイズを取得
    const width = 256;
    const height = 192;    
    renderTarget = new WebGLRenderTarget(width, height,{
      format: RGBAFormat,
      colorSpace: SRGBColorSpace,
    });

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    container.value.appendChild(renderer.domElement)

    // シーン追加
    scene = new Scene();
    scene.background = null;
    // カメラの作成
    camera = new PerspectiveCamera(45, width / height, 0.1, 70);
    camera.position.set(2, 2, 4);
    camera.lookAt(new Vector3(0, 1.4, 0));

    //オフスクリーンレンダリング用のシーンとカメラ
    offScene = new Scene();
    offScene.background = null;

    // 視野角をラジアンに変換
    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = (height / 2) / Math.tan(fovRad);
    offCamera = new PerspectiveCamera(fov, width / height, 1, dist * 2);
    offCamera.position.z = 200;// カメラを遠ざける

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
      transparent: true,  // 透明を有効にする
    });
    const plane = new Mesh(geo, mat);
    plane.material.transparent = true;

    offScene.add(plane)

    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.intensity = 4; // 光の強さを倍に
    directionalLight.position.set(2, 2, 1); // ライトの方向
    scene.add(directionalLight);


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
      animationId = requestAnimationFrame(tick)
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
      if (isMouseOver.value) {
        model.rotation.y += 0.01;
      }
      if (renderer) {
        renderer.setRenderTarget(renderTarget);
        renderer.clear(); // クリアを行う

        renderer.render(scene, camera);

        renderer.setRenderTarget(null); // レンダーターゲットを解除します
        renderer.clear();

        renderer.render(offScene, offCamera)
       
      }
      
    }
    tick()
  }

  return { init }
}
const CheckScrollBoxPos = () => {
  if (!container.value) return
  
  // 要素の位置を取得
  const rect = container.value.getBoundingClientRect()
  // rectBの中心点
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  webGLPos.value.x = Math.floor(centerX).toString();
  webGLPos.value.y = Math.floor(centerY).toString();
  
}
const BoxMouseOver = (event: { clientX: any; clientY: any; }) => {
  isMouseOver.value = true;
  r_MouseOverCursor.value.style.display = "block";
  const mouseX = event.clientX - 16; // マウスのX座標
  const mouseY = event.clientY - 16; // マウスのY座標  
  r_MouseOverCursor.value.style.left = `${mouseX}px`;
  r_MouseOverCursor.value.style.top = `${mouseY}px`;
}
const BoxMouseMove = (event: { clientX: any; clientY: any; }) => {
  if (!isMouseOver.value) {
    return;
  }
  const mouseX = event.clientX - 16; // マウスのX座標
  const mouseY = event.clientY - 16; // マウスのY座標  
  r_MouseOverCursor.value.style.left = `${mouseX}px`;
  r_MouseOverCursor.value.style.top = `${mouseY}px`;
}
const BoxMouseOut = () => {
  isMouseOver.value = false;
  r_MouseOverCursor.value.style.display = "none";
};
onMounted(() => {
  const { init } = useSphere(container, 500, 500)
  init()
  checkInDisplay()
  window.addEventListener('scroll', CheckScrollBoxPos)
  container.value.addEventListener('mousemove', BoxMouseMove);
  container.value.addEventListener('mouseover', BoxMouseOver);
  container.value.addEventListener('mouseout', BoxMouseOut)
  contentsSize.value.w = r_webGLboxCursor.value.clientWidth / 4;
  contentsSize.value.h = r_webGLboxCursor.value.clientHeight / 4;
})
onBeforeUnmount(() => {
  if (observer) {
    observer.unobserve(container.value);
  }
  // scene.dispose();
  container.value.removeEventListener('mousemove', BoxMouseMove)
  container.value.removeEventListener('mouseover', BoxMouseOver)
  container.value.removeEventListener('mouseout',BoxMouseOut)

});
// コンテキスト削除
onUnmounted(() => {
  if (renderer) {
    cancelAnimationFrame(animationId);
    // mat.dispose();
    renderer.dispose()
    renderer.forceContextLoss()
  }
  window.removeEventListener('scroll', CheckScrollBoxPos)
})

watch(() => props.isActive, (newValue) => {
  if (newValue) {
    isEffectStart = true;
    isEffectEnd = false
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
