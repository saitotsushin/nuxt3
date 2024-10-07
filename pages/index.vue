<template>
  <div>
    <div class="l-content-scroll">
      <div class="l-content-wrapper">
        <div class="l-content-wrapper-inner">
          <div class="l-selectCursor">
            <div class="p-selectCursor">
              <div class="c-selectCursor" ref="selectCursor"></div>
              <div class="c-selectCursor-title" ref="selectCursorTitle"></div>
            </div>
          </div>
          <PageTitle/>
          <Box3D_lo ref="Box3D_lo_1"
            modelIndex=1
            title="NIKE AIR JORDAN 2" 
            cgPath="/nuxt3/object/sneaker_lo.glb"
            mainColor="#473acc"
            @getTitle="receiveTitle"
          />
          <Box3D_lo ref="Box3D_lo_2"
            modelIndex=2
            title="NIKE DUNK LOW Pro B" 
            cgPath="/nuxt3/object/sneaker_lo_2.glb"
            mainColor="#F00"
            @getTitle="receiveTitle"
          />
          <Box3D_lo ref="Box3D_lo_3"
          modelIndex=3
          title="NIKE SNEAKER AAAAA"
            cgPath="/nuxt3/object/sneaker_lo_others.glb"
            mainColor="#333"
            @getTitle="receiveTitle"/>
          <Box3D_lo ref="Box3D_lo_4"
          modelIndex=4
          title="NIKE OTHERS"
            cgPath="/nuxt3/object/sneaker_lo_others.glb"
            mainColor="#333"
            @getTitle="receiveTitle"/>
        </div>
      </div>
      
    </div>
    <ScrollBar :scrollContent="scrollContent"/>
  </div>
</template>
<script setup>
const MainColumHeader = ref("/");
const messages = 'Hello from Parent Component'
const items = ref([
]);

const scrollContentW = inject('scrollContent');

const website = useWebsiteStore()
// scrollContent の参照を作成
const scrollContent = ref(null)
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

let beforeTitle = "";

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
      displayName();
    }
    if (!isActive) {
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
const displayName = () => {
  console.log("title.value", title.value)
  if (beforeTitle == title.value) {
    return;
  }
  beforeTitle = title.value;

  selectCursorTitle.value.innerHTML = "";
  const titleWoards = title.value.split("");
  var setSpans = [];

  titleWoards.forEach((word, i) => {
    const spanElement = document.createElement('span');
    if (word == " ") {
      spanElement.classList.add('nameSpacer');
    }
    spanElement.textContent = word;
    setSpans.push(spanElement);
  });
  const divElement = document.createElement('div');
  divElement.classList.add('nameList');
  setSpans.forEach((word, i) => {
    divElement.appendChild(setSpans[i]);
  });
  selectCursorTitle.value.appendChild(divElement);
  const spa = divElement.querySelectorAll('span');
  spa.forEach((spa_t, k) => {
    setTimeout(() => {
      spa_t.style.display = "block" // 指定したタイミングで文字を表示
    }, k * 100); // 200ms 間隔で表示
  });
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
