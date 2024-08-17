<template>
  <NuxtLayout>
    <Header/>
    <NuxtPage :transition="transition"/>
    <BgImage/>
    <Footer/>
  </NuxtLayout>
</template>
<script setup>
const transition = {
  name: 'page',
  mode: 'out-in',
  onEnter: (el, done) => {
    console.log("onEnter");
    done();
  },
  onBeforeEnter: (el) => {
    console.log("onBeforeEnter");
  },
  onBeforeLeave: (el) => {
    console.log("onBeforeLeave");
  },
  onAfterEnter: (el) => {
    console.log("onAfterEnter");
  },
  onLeave: (el, done) => {
    console.log("onLeave");
    done();
  },
}
</script>