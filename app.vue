<template>
  <NuxtLayout>
    <NuxtPage :transition="transition"/>
  </NuxtLayout>
</template>
<script setup>
const transition = {
  name: 'page',
  mode: 'out-in',
  onEnter: (el, done) => {
    done("onEnter");
  },
  onBeforeLeave: (el) => {
    done("onBeforeLeave");
  },
  onLeave: (el, done) => {
    done("onLeave")
  },
}
function done(e) {
  console.log("done",e)
}
</script>