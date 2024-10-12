<template>
  <div>
    <div class="l-content-scroll">
      <div class="l-content-wrapper">
        <div class="l-content-wrapper-inner">
          <div class="l-selectCursor">
            <div class="p-selectCursor" :class="{ 'isDebug': componentStore.isDebug }">
              <div 
                class="c-selectCursor" 
                ref="selectCursor"
                :class="{ 'isDebug': componentStore.isDebug }"
              >
                <div 
                  class="c-selectCursor-pos debugBox" :class="{ 'isActive': componentStore.isDebug }"
                >
                  <div class="c-selectCursor-pos-disp -topLeft" ref="selectCursorTopLeft">
                    ({{ selectCursorPos.topLeft.x }},{{ selectCursorPos.topLeft.y }})
                  </div>
                  <div class="c-selectCursor-pos-disp -topRight" ref="selectCursorTopRight">
                    ({{ selectCursorPos.topRight.x }},{{ selectCursorPos.topRight.y }})
                  </div>
                  <div class="c-selectCursor-pos-disp -bottomLeft" ref="selectCursorBottomLeft">
                    ({{ selectCursorPos.bottomLeft.x }},{{ selectCursorPos.bottomLeft.y }})
                  </div>
                  <div class="c-selectCursor-pos-disp -bottomRight" ref="selectCursorBottomRight">
                    ({{ selectCursorPos.bottomRight.x }},{{ selectCursorPos.bottomRight.y }})
                  </div>
                </div>
                <div class="c-selectCursor-name" :class="{ 'isActive': componentStore.isDebug }">
                  Touch Area
                </div>
              </div>
            </div>
          </div>
          <PageTitle/>
          <div class="debugBox debugShowActiveObjIndex" :class="{ 'isActive': componentStore.isDebug }">
            Active Obj index: {{ activeIndex }}
          </div>
          <Box3D_lo_mos ref="Box3D_lo_1"
            modelIndex=1
            title="NIKE AIR JORDAN 2" 
            cgPath="/nuxt3/object/sneaker_lo.glb"
            mainColor="#473acc"
            :isActive="activeIndex === 0"
            @getTitle="receiveTitle"
          />
          <Box3D_lo_mos ref="Box3D_lo_2"
            modelIndex=2
            title="NIKE DUNK LOW Pro B" 
            cgPath="/nuxt3/object/sneaker_lo_2.glb"
            mainColor="#F00"
            :isActive="activeIndex === 1"
            @getTitle="receiveTitle"
          />
          <Box3D_lo ref="Box3D_lo_3"
          modelIndex=3
          title="NIKE SNEAKER AAAAA"
            cgPath="/nuxt3/object/sneaker_lo_others.glb"
            mainColor="#333"
            :isActive="activeIndex === 2"
            @getTitle="receiveTitle"/>
          <Box3D_lo ref="Box3D_lo_4"
          modelIndex=4
          title="NIKE OTHERS"
            cgPath="/nuxt3/object/sneaker_lo_others.glb"
            mainColor="#333"
            :isActive="activeIndex === 3"
            @getTitle="receiveTitle"/>
        </div>
      </div>
      
    </div>
    <ScrollBar/>
  </div>
</template>
<script setup>
const activeIndex = ref(-1)

const website = useWebsiteStore()

// Piniaのストアインスタンスを取得
const componentStore = useComponentStore()

// scrollContent の参照を作成
const selectCursorTitle = ref(null);

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

const selectCursorTopLeft = ref(null)
const selectCursorTopRight = ref(null)
const selectCursorBottomLeft = ref(null)
const selectCursorBottomRight = ref(null)

const selectCursorPos = ref({
  topLeft: {
    x: "0",
    y: "0"
  },
  topRight: {
    x: "0",
    y: "0"
  },
  bottomLeft: {
    x: "0",
    y: "0"
  },
  bottomRight: {
    x: "0",
    y: "0"
  }
})

// let beforeTitle = "";

// 子コンポーネントからタイトルを受け取る関数
const receiveTitle = (_title) => {
  title.value = _title;
}

const isOverlapping = ref(false);

const checkOverlap = () => {
  const rectB = selectCursor.value.getBoundingClientRect()
  // 比率を変数化 (例: 50% -> 0.5)
  const overlapRatio = 1.0 // 50%を変数化->0.5

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
  selectCursorPos.value.topLeft.x     = Math.floor(rectBPartial.left);
  selectCursorPos.value.topLeft.y     = Math.floor(rectBPartial.top);
  selectCursorPos.value.topRight.x    = Math.floor(rectBPartial.right);
  selectCursorPos.value.topRight.y    = Math.floor(rectBPartial.top);
  selectCursorPos.value.bottomLeft.x  = Math.floor(rectBPartial.left);
  selectCursorPos.value.bottomLeft.y  = Math.floor(rectBPartial.bottom);
  selectCursorPos.value.bottomRight.x = Math.floor(rectBPartial.right);
  selectCursorPos.value.bottomRight.y = Math.floor(rectBPartial.bottom);
  
  // 各ElementAとselectCursorの重なりを判定
  const elements = [Box3D_lo_1, Box3D_lo_2, Box3D_lo_3,Box3D_lo_4] // refを配列に格納
  isOverlapping.value = elements.some((comp,index) => {
    const rectA = comp.value.container.getBoundingClientRect()
    const rectACenter = {
      x: (rectA.right - rectA.left) / 2 + rectA.left,
      y: (rectA.bottom - rectA.top) / 2 + rectA.top
    }

    let isActive = false;
    if (rectBPartial.top < rectACenter.y && rectACenter.y < rectBPartial.bottom) {
      comp.value.sendTitle()
      comp.value.animationPlay()
      isActive = true;
      activeIndex.value = index;
      disableScroll();
      // displayName();
    } else {
      
    }
    if (!isActive) {
      activeIndex.value = -1;
      title.value = "";
    }
    return isActive;
  })
}
const checkScrollTop = () => {
  // ページの一番上にいるかどうかを確認
  if (window.scrollY === 0) {
    website.setMainBasicColor();
    // ここに、スクロールが上に到達したときの処理を追加します

  }  
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

  // スクロールイベントを監視
  window.addEventListener('scroll', checkScrollTop)

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
