<template>
  <div class="ScrollBar">
    <img src="/images/scroll_arrow_top.png" class="ScrollBarArrow ScrollBarArrow--top"/>
    <img src="/images/scroll_arrow_bottom.png" class="ScrollBarArrow ScrollBarArrow--bottom"/>
    <div ref="customScrollbar" class="custom-scrollbar">
    <div ref="scrollbarThumb" class="custom-scrollbar-thumb">
      <div class="custom-scrollbar-thumb-inner"></div>
    </div>
  </div>
  </div>
  <div class="debug">
    <div>高さ: {{ debug_clientHeight }}</div>
    <div>スクロール高さ: {{ debug_scrollHeight }}</div>
    <div>イベント名: {{ debug_mouseEvent }}</div>
    <div>deltaY: {{ debug_mdeltaY }}</div>
    <div>debug_scrollDelta: {{ debug_scrollDelta }}</div>
    <div>debug_pageY: {{ debug_pageY }}</div>
    <div>debug_startY: {{ debug_startY }}</div>
    <div>debug_startScrollTop: {{ debug_startScrollTop }}</div>
    <div>debug_thumbPosition: {{ debug_thumbPosition }}</div>

  </div>
</template>
<style>
body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge用 */
}
.debug{
  display: none;
  position: fixed;
  top: 100px;
  left: 0;
}
</style>
<script setup lang="ts">
// 親から受け取る scrollContent を定義 (undefined の可能性を考慮)
// interface ScrollBarProps {
//   scrollContent: HTMLElement | null // HTMLElement | null に変更
// }

// const props = defineProps<ScrollBarProps>()

// ref を使ってスクロールバーとつまみの要素を参照
const customScrollbar = ref<HTMLElement | null>(null)
const scrollbarThumb = ref<HTMLElement | null>(null)
// const scrollContent = ref<HTMLElement | null>(null)
const debug_clientHeight = ref('')
const debug_scrollHeight = ref('')
const debug_mouseEvent = ref('')
const debug_mdeltaY = ref('')
const debug_scrollDelta = ref('');
const debug_pageY = ref('');
const debug_startY = ref('');
const debug_startScrollTop = ref('');
const debug_thumbPosition = ref('');

onMounted(() => {
  // scrollContent が null でないか確認
  // スクロールイベントに基づいてスクロールバーを調整

  // DOM 要素がマウントされた後に scrollContent を設定
  const contentElement = document.querySelector('.l-wrapper');
  if (!contentElement) {
    return;
  }
  // scrollContent.value = contentElement
  let contentHeight = contentElement.scrollHeight
  let visibleHeight = window.innerHeight
  let thumbHeight = (visibleHeight / contentHeight) * visibleHeight
  let scrollTop = window.scrollY
  // スクロールバーのつまみの高さと位置を調整
  let thumbPosition = (scrollTop / contentHeight) * visibleHeight + 15

  if (scrollbarThumb.value) {
    scrollbarThumb.value.style.height = `${thumbHeight}px`
    scrollbarThumb.value.style.transform = `translateY(${thumbPosition}px)`
  }

  window.addEventListener('scroll', () => {
    if (isDragging) {
      return;
    }
    if (scrollbarThumb.value) {
      scrollTop = window.scrollY
      // スクロールバーのつまみの高さと位置を調整
      thumbPosition = (scrollTop / contentHeight) * visibleHeight
      if (thumbPosition < 15) {
        thumbPosition = 15;
      }
      if (thumbPosition > window.innerHeight - thumbHeight - 15) {
        thumbPosition = window.innerHeight - thumbHeight - 15
      }

      scrollbarThumb.value.style.transform = `translateY(${thumbPosition}px)`

    }
  })

  // ドラッグ操作でスクロールを制御
  let isDragging = false

  let startY: number;
  let startScrollTop: number;
  let start_C_Y: number;

  if (scrollbarThumb.value) {
    /*
    マウスダウン
    */
    scrollbarThumb.value.addEventListener('mousedown', (e: MouseEvent) => {
      isDragging = true
      startY = e.pageY
      start_C_Y = e.clientY
      debug_startY.value = startY.toString();

      scrollTop = window.scrollY
      thumbPosition = (scrollTop / contentHeight) * visibleHeight


      startScrollTop = window.scrollY
      debug_startScrollTop.value = startScrollTop.toString();

      document.body.style.userSelect = 'none' // テキスト選択を無効化
    })

    debug_clientHeight.value = contentElement.clientHeight.toString();
    debug_scrollHeight.value = contentElement.scrollHeight.toString();
    /*
    スクロール中
    */
    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (isDragging) {
        const deltaY = e.pageY - startY//どのくらいドラッグしたか
        const deltaW_Y = e.clientY - start_C_Y//どのくらいドラッグしたか
        const scrollDelta = (deltaW_Y / window.innerHeight) * document.documentElement.scrollHeight
        window.scrollTo(0, startScrollTop + scrollDelta); 
        debug_pageY.value = e.pageY.toString();
        debug_startY.value = startY.toString();
        debug_mdeltaY.value = deltaY.toString();
        debug_scrollDelta.value = scrollDelta.toString();

        if (scrollbarThumb.value) {
       
          // スクロールバーのつまみの高さと位置を調整
          let setPos = (deltaW_Y / window.innerHeight) * visibleHeight + thumbPosition;

          scrollbarThumb.value.style.transform = `translateY(${setPos}px)`

          debug_thumbPosition.value = setPos.toString();
          if (setPos < 15) {
            setPos = 15;
            scrollbarThumb.value.style.transform = `translateY(${setPos}px)`
            debug_thumbPosition.value = thumbPosition.toString();
          }
          if (setPos > window.innerHeight - thumbHeight - 15) {
            setPos = window.innerHeight - thumbHeight - 15;
            scrollbarThumb.value.style.transform = `translateY(${setPos}px)`
            debug_thumbPosition.value = thumbPosition.toString();
          }  
        }
      }
    })

    document.addEventListener('mouseup', () => {
      isDragging = false
      document.body.style.userSelect = '' // テキスト選択を再度有効化
    })
  }
})
</script>
<style lang="scss">
.ScrollBar{
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 15px;
}
.scroll-container {
  position: relative;
  width: 300px;
  height: 400px;
  overflow: hidden; /* デフォルトのスクロールバーを隠す */
  border: 1px solid #ccc;
}

.scroll-content {
  width: 100%;
  height: 100%;
  overflow-y: scroll; /* 内部でのスクロールを有効にする */
}

.custom-scrollbar {
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  background-color: #E7E7E5; /* カスタムスクロールバーの背景色 */
  border-radius: 0px;
  height: 100%;
}

.custom-scrollbar-thumb {
  position: absolute;
  top: 0;
  right: 0;
  width: 13px;
  height: 60px;
  border-top: 1px solid ;
  background-color: #C5C2C6; /* スクロールバーのつまみ */
  border-radius: 0px;
  border-left: 1px solid #F7F7F7;
  border-right: 1px solid #949293;
  border-bottom: 1px solid #868686;
}
.custom-scrollbar-thumb-inner{
  width: 100%;
  height: 100%;
  border-top: 1px sold #BDBCBF;
  border-right: 1px solid #908D91;
  border-bottom: 1px solid #999797;
  border-left: 1px solid #E5E5E5;

}
.ScrollBarArrow{
  position: absolute;
  left: 0;
  z-index: 20;
}
.ScrollBarArrow--top{
  top: 0;
}
.ScrollBarArrow--bottom{
  bottom: 0;
}
</style>