<template>
  <div class="l-wrapper" :style="{ backgroundColor: website.mainColor }" ref="scrollContent">    
    <Header/>
    <div class="l-inner font-bit">
      <div class="p-mainImage" ref="mainImage" id="js-mainImage">
        <Box3D_main/>
      </div>
      <NuxtLayout>
        <div class="l-contents">
          <NuxtPage :transition="transition"/>
          <div
            id="js-next-display"
            class="c-next-display"
            ref="contentsLoading"
            :style="{ backgroundColor: website.subColor }">
          </div>
        </div>
      </NuxtLayout>
    </div>
    <Footer/>
  </div>

</template>
<script setup>
import gsap from 'gsap';
const contentsLoading = ref(null); // 監視対象の要素

// Piniaのストアインスタンスを取得
const componentStore = useComponentStore()
const { components } = storeToRefs(componentStore)

const website = useWebsiteStore()

const scrollContent = ref(null);

// 子コンポーネントにscrollContentを提供する
provide('scrollContent', scrollContent);



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
    console.log("2. onLeave");
    // // ComponentBを.box内にコピー
    // if (box.value && contents.value) {
    //   const componentB = contents.value.querySelector('componentB')
    //   if (componentB) {
    //     // ComponentBの要素を.boxの最後にコピー
    //     box.value.appendChild(componentB.cloneNode(true))
    //   }
    // }

    gsap.to(contentsLoading.value, {
      width: "100%",
      duration: 0.5,
      delay: 0.25,
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