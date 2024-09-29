<template>
  <div>
    <div class="" ref="scrollContent">
      <!-- <div class="debug-text">
        <p v-if="isOverlapping">要素Aと要素Bが重なっています！</p>
      </div> -->
      <div class="l-content-wrapper">
        <div class="l-content-wrapper-inner">
          <div class="l-selectCursor">
            <div class="p-selectCursor" ref="selectCursor">
              <div class="c-selectCursor-title">{{ title }}</div>
            </div>
          </div>
          <Box3D_lo ref="Box3D_lo_1"
            title="NIKE AIR JORDAN 1" 
            cgPath="/nuxt3/object/sneaker_lo.glb"
            mainColor="#000"
            @getTitle="receiveTitle"
          />
          <Box3D_lo ref="Box3D_lo_2"
            title="NIKE DUNK LOW Pro B" 
            cgPath="/nuxt3/object/face.glb"
            mainColor="#F00"
            @getTitle="receiveTitle"
          />
          <Box3D_lo ref="Box3D_lo_3"
            title="NIKE SNEAKER AAAAA"
            cgPath="/nuxt3/object/sneaker_lo_others.glb"
            mainColor="#FFF"
            @getTitle="receiveTitle"/>
          <Box3D_lo ref="Box3D_lo_4"
            title="NIKE OTHERS"
            cgPath="/nuxt3/object/sneaker_lo_others.glb"
            mainColor="#CCC"
            @getTitle="receiveTitle"/>
        </div>
      </div>
      <SizeSticker/>
    </div>
    <ScrollBar v-if="scrollContent" :scrollContent="scrollContent"/>
  </div>
</template>
<script setup>
const MainColumHeader = ref("/");
const messages = 'Hello from Parent Component'
const items = ref([
]);
// scrollContent の参照を作成
const scrollContent = ref(null)
// const scrollContent = ref<HTMLElement | null>(null)

const targetElement = ref(null)
const isFixed = ref(false)
const title = ref('')

// 個別のrefを作成
const Box3D_lo_1 = ref(null)
const Box3D_lo_2 = ref(null)
const Box3D_lo_3 = ref(null)
const Box3D_lo_4 = ref(null)
const selectCursor = ref(null)
const isOverlappingDebug = ref(false)

// 子コンポーネントからタイトルを受け取る関数
const receiveTitle = (_title) => {
  title.value = _title;
}

const isOverlapping = ref(false);

const checkOverlap = () => {
  const rectB = selectCursor.value.getBoundingClientRect()
  // 比率を変数化 (例: 50% -> 0.5)
  const overlapRatio = 0.5 // 50%を変数化

  // rectBの指定された比率の領域を計算
  const widthRatioB = rectB.width * overlapRatio
  const heightRatioB = rectB.height * overlapRatio

  // rectBの中心点
  const centerX = rectB.left + rectB.width / 2
  const centerY = rectB.top + rectB.height / 2

  // rectBの比率に基づいた範囲を計算
  const rectBPartial = {
    left: centerX - widthRatioB / 2,
    right: centerX + widthRatioB / 2,
    top: centerY - heightRatioB / 2,
    bottom: centerY + heightRatioB / 2
  }
  
  // 各ElementAとselectCursorの重なりを判定
  const elements = [Box3D_lo_1, Box3D_lo_2, Box3D_lo_3,Box3D_lo_4] // refを配列に格納
  isOverlapping.value = elements.some(comp => {
    const rectA = comp.value.container.getBoundingClientRect()
    let isActive = false;
    if (rectBPartial.top > rectA.top && rectBPartial.bottom < rectA.bottom) {
      comp.value.sendTitle()
      comp.value.animationPlay()
      isActive = true;
      disableScroll();
    }
    if (!isActive) {
      title.value = "";
    }
    return isActive;
  })
}


const disableScroll = () => {
  // if (isOverlapping.value == true) {
  //   return;
  // }
  // // スクロールを無効にする
  // document.documentElement.style.overflow = 'hidden';

  // // 0.5秒後にスクロールを再び有効にする
  // setTimeout(function() {
  //   document.documentElement.style.overflow = '';
  // }, 500);
}

// スクロールを無効にするタイミングで関数を呼び出す


const handleScroll = () => {
  if (!targetElement.value) return
  
  // 要素の位置を取得
  const rect = targetElement.value.getBoundingClientRect()
  
  // 要素が画面の一番上に来たら固定
  isFixed.value = rect.top <= 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  checkOverlap()  // 初回チェック

  // スクロールやウィンドウのリサイズを監視して重なりを判定
  window.addEventListener('scroll', checkOverlap)

  // DOM 要素がマウントされた後に scrollContent を設定
  const contentElement = document.querySelector('.scroll-content');
  scrollContent.value = contentElement
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  // イベントリスナーをクリーンアップ
  window.removeEventListener('scroll', checkOverlap)
})
</script>

<style>
</style>
