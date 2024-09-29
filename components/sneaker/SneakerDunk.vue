<template>
  <div class="c-dunk_thumb" ref="targetElement" :class="{ fixed: isFixed }">
    <img src="/images/thumb/2.png"/>
  </div>
</template>
<style>
</style>
<script setup>
const targetElement = ref(null)
const isFixed = ref(false)
let rectValue = 0;
let rect = null;

const visible = ref(false);

function handleIntersect(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (visible.value == false) {
        visible.value = true;
        targetElement.value.classList.add("isActive");
      }
    } else {
      visible.value = false;
      targetElement.value.classList.remove("isActive");
    }
  });
}
onMounted(() => {
  const h = window.innerHeight * -1 + 60;
  const observer = new IntersectionObserver(handleIntersect, {
    root: null, // ビューポートを基準とする
    rootMargin: '0% 0px ' + h +'px 0px', // 上部20%をトリガー領域に設定
    threshold: 0 // 0%表示された時点でトリガーする
  });

  if (targetElement.value) {
    observer.observe(targetElement.value);
  }


})
onUnmounted(() => {
  if (targetElement.value) {
    observer.unobserve(targetElement.value);
  }
});
</script>
<style lang="scss">
.l-dunk_thumb{
  padding: 20px;
}
.c-dunk_thumb{
  background-color: #ccc;
  // border-radius: 10px;
  transition: 0.2s ease-in-out;
  // position: relative;
  position:sticky; /* 要素をスクロールに応じて固定 */
  top: 60px; /* 縦スクロールに追従 */
  z-index: 100; /* z-indexで最前面に持ってくる */
  margin: 0 0 40px 120px;
  padding: 70px 30px 40px 110px;
  img{
    display: block;
    width: 100%;
  }
  &.isActive{
    margin: 20px 20px 60px 140px;
  }
}

</style>