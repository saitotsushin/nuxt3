<template>
  <div class="wrapper" :style="{ backgroundImage: 'url(' + pageImage.bgImage + ')' }">
    <Header />
    <BgSelect @bg-selected="bgSelected"/>
    <slot />
    <BgImage/>
    <Footer />
  </div>
</template>

<script setup>
const pageImage = ref({
  bgImage: "/nuxt3/images/bg.png",
});
const bgSelected = (itemInfo) => {
  console.log("itemInfo.bgImage=" + itemInfo.bgImage);
  pageImage.value.bgImage = itemInfo.bgImage;
};
</script>