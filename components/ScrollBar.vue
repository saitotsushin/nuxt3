<template>
  <div class="ScrollBar">
    <div ref="customScrollbar" class="custom-scrollbar">
    <div ref="scrollbarThumb" class="custom-scrollbar-thumb"></div>
  </div>
  </div>
</template>
<script setup lang="ts">
// 親から受け取る scrollContent を定義 (undefined の可能性を考慮)
interface ScrollBarProps {
  scrollContent: HTMLElement | null // HTMLElement | null に変更
}

const props = defineProps<ScrollBarProps>()

// ref を使ってスクロールバーとつまみの要素を参照
const customScrollbar = ref<HTMLElement | null>(null)
const scrollbarThumb = ref<HTMLElement | null>(null)

onMounted(() => {
  // scrollContent が null でないか確認
  if (!props.scrollContent) {
    console.warn('scrollContent is null or undefined')
    return
  }
  console.log("scroll");
  // スクロールイベントに基づいてスクロールバーを調整
    props.scrollContent.addEventListener('scroll', () => {
      if (!props.scrollContent) {
        return;
      }      
      console.log("scroll");
      const contentHeight = props.scrollContent.scrollHeight
      const visibleHeight = props.scrollContent.clientHeight
      const scrollTop = props.scrollContent.scrollTop

      // スクロールバーのつまみの高さと位置を調整
      const thumbHeight = (visibleHeight / contentHeight) * visibleHeight
      const thumbPosition = (scrollTop / contentHeight) * visibleHeight

      if (scrollbarThumb.value) {
        scrollbarThumb.value.style.height = `${thumbHeight}px`
        scrollbarThumb.value.style.transform = `translateY(${thumbPosition}px)`
      }
    })



  // ドラッグ操作でスクロールを制御
  let isDragging = false
  console.log("isDragging", isDragging);

  let startY: number, startScrollTop: number
  if (scrollbarThumb.value) {
    scrollbarThumb.value.addEventListener('mousedown', (e: MouseEvent) => {
      if (!props.scrollContent) {
        return;
      }
      isDragging = true
      startY = e.pageY
      startScrollTop = props.scrollContent.scrollTop
      document.body.style.userSelect = 'none' // テキスト選択を無効化
    })
  }

  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (isDragging && props.scrollContent) {
      const deltaY = e.pageY - startY
      const scrollDelta = (deltaY / props.scrollContent.clientHeight) * props.scrollContent.scrollHeight
      props.scrollContent.scrollTop = startScrollTop + scrollDelta
    }
  })

  document.addEventListener('mouseup', () => {
    isDragging = false
    document.body.style.userSelect = '' // テキスト選択を再度有効化
  })
})
</script>
<style lang="scss">
.ScrollBar{
  position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
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
  width: 8px;
  background-color: rgba(0, 0, 0, 0.2); /* カスタムスクロールバーの背景色 */
  border-radius: 4px;
  height: 100%;
}

.custom-scrollbar-thumb {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.8); /* スクロールバーのつまみ */
  border-radius: 4px;
}
</style>