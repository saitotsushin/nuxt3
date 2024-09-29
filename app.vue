<template>
  <div class="wrapper" >    
    <Header/>
    <div class="MainWrap font-bit">
      <div class="MainImage">
        <Box3D_main/>
        <p v-if="isOverlapping">要素Aと要素Bが重なっています！</p>
      </div>
      <NuxtLayout>
        <div class="contents">
          <NuxtPage :transition="transition"/>
          <div id="js-next-display" ref="contentsLoading" :style="{ backgroundColor: website.subColor }"></div>
        </div>
      </NuxtLayout>
    </div>
    <Footer/>
  </div>

</template>
<script setup>
import gsap from 'gsap';
const contentsLoading = ref(null); // 監視対象の要素

const website = useWebsiteStore();

const transition = {
  name: 'page',
  mode: 'out-in',
  css: false,
  // leave フックの前に呼ばれる
  // 大体の場合は、leave フックだけ使用するべき
  onBeforeLeave: (el) => {
    gsap.set(contentsLoading.value, {
      width: "0%",
      x: "0px"
    });
  },
  // leave トランジションの開始時に呼ばれる
  // leave アニメーションを開始する時に使用する
  onLeave: (el, done) => {
    gsap.to(contentsLoading.value, {
      width: "100%",
      duration: 0.5,
      ease: "power1.inOut",
      onComplete: done
    });
  },
  onAfterLeave: (el) => {
  },
  // 要素が DOM に挿入される前に呼ばれる
  onBeforeEnter: (el) => {
  },
  // 要素が DOM に挿入された次のフレームで呼ばれる
  onEnter: (el, done) => {
    gsap.to(contentsLoading.value, {
      x: window.innerWidth + "px",
      duration: 0.5,
      ease: "power1.inOut",
      onComplete: done
    });
  },
  // enter トランジションが完了したときに呼ばれる
  onAfterEnter: (el) => {
  },
}
</script>
<style lang="scss">
.contents{
  position: relative;
}
#js-next-display{
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  z-index: 1000;
  background-color: #f15927;
}
</style>
