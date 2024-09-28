<template>
  <div>
    <div class="MainWrap">
      <div class="MainImage">
        <Box3D_main/>
        <p v-if="isOverlapping">要素Aと要素Bが重なっています！</p>
      </div>
      <div class="ContentsWrap">
        <div class="ContentsWrapInner">
          <div class="SelectCursor" ref="elementB">
            <div class="SelectTitle">{{ title }}</div>
          </div>
          <Box3D_lo ref="Box3D_lo_1"
            title="NIKE AIR JORDAN 1" 
            cgPath="/nuxt3/object/sneaker_lo.glb"
            @getTitle="receiveTitle"
          />
          <Box3D_lo ref="Box3D_lo_2"
            title="NIKE DUNK LOW Pro B" 
            cgPath="/nuxt3/object/sneaker_box.glb"
            @getTitle="receiveTitle"
          />
          <Box3D_lo ref="Box3D_lo_3"
            title="要素Cのタイトル"
            cgPath="/nuxt3/object/sneaker_lo.glb"
            @getTitle="receiveTitle"/>
          <Box3D_lo ref="Box3D_lo_4"
            title="要素Dのタイトル"
            cgPath="/nuxt3/object/face.glb"
            @getTitle="receiveTitle"/>
        </div>
      </div>
      <div style="height: 1000px;"></div>
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
  </div>
</template>
<script setup>
const MainColumHeader = ref("/");
const messages = 'Hello from Parent Component'
const items = ref([
]);

const targetElement = ref(null)
const isFixed = ref(false)
const title = ref('')

// 個別のrefを作成
const Box3D_lo_1 = ref(null)
const Box3D_lo_2 = ref(null)
const Box3D_lo_3 = ref(null)
const Box3D_lo_4 = ref(null)
const elementB = ref(null)
const isOverlapping = ref(false)
// 子コンポーネントからタイトルを受け取る関数
const receiveTitle = (_title) => {
  title.value = _title;
}

const checkOverlap = () => {
  const rectB = elementB.value.getBoundingClientRect()
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
  
  // 各ElementAとElementBの重なりを判定
  const elements = [Box3D_lo_1, Box3D_lo_2, Box3D_lo_3,Box3D_lo_4] // refを配列に格納
  isOverlapping.value = elements.some(comp => {
    const rectA = comp.value.container.getBoundingClientRect()
    let isActive = false;
    if (rectBPartial.top > rectA.top && rectBPartial.bottom < rectA.bottom) {
      comp.value.sendTitle()
      isActive = true;
    }
    if (!isActive) {
      title.value = "";
    }
    return isActive;
  })
}

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
