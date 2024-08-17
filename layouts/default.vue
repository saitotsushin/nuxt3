<template>
  <div class="wrapper" >
    <slot />
  </div>
</template>

<script setup>
// definePageMeta({
//   layoutTransition: {
//     name: 'layout-fade',
//     onEnter: (el, done) => {
//         console.log("L_l_onEnter1");
//         done();
//     },
//     onBeforeEnter: (el) => {
//         console.log("L_l_onBeforeEnter1");
//     },
//     onBeforeLeave: (el) => {
//         console.log("L_l_onBeforeLeave1");
//     },
//     onAfterEnter: (el) => {
//         console.log("L_l_onAfterEnter1");
//     },
//     onLeave: (el, done) => {
//         console.log("L_l_onLeave1");
//         done();
//     },
//   },
//    pageTransition: {
//       name: 'page',
//       mode: 'out-in',
//       onEnter: (el, done) => {
//          console.log("L_onEnter2");
//          done();
//       },
//       onBeforeEnter: (el) => {
//          console.log("L_onBeforeEnter2");
//       },
//       onBeforeLeave: (el) => {
//          console.log("L_onBeforeLeave2");
//       },
//       onAfterEnter: (el) => {
//          console.log("L_onAfterEnter2");
//       },
//       onLeave: (el, done) => {
//          console.log("L_onLeave2");
//          done();
//       },
//    }
// });
</script>
<style>
/* トランジション用のスタイル */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
