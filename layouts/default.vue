<template>
  <div class="container">
    <Header />
    <!-- <p>{{ route.path }}</p> -->
    <div class="cardClose" @click="CardClose()" :class="closeBtn">x</div>
    <Card
        :imagePath="'/nuxt3/images/thumb/html5game.png'"
        :cardName="'HTML5game'"
        :imageIcon="'/nuxt3/images/icons/html5.png'"
        :productId="'product_1'"
        :class="className"
      />
      <Card
        :imagePath="'/nuxt3/images/thumb/famireview.png'"
        :cardName="'bubble.io'"
        :imageIcon="'/nuxt3/images/icons/bubble.png'"
        :productId="'product_2'"
        :class="className"
      />
      <Card
        :imagePath="'/nuxt3/images/thumb/moveandslash.png'"
        :cardName="'Unity'"
        :imageIcon="'/nuxt3/images/icons/unity.png'"
        :productId="'product_3'"
        :class="className"
      />
      <Card
        :imagePath="'/nuxt3/images/thumb/blender.png'"
        :cardName="'blender'"
        :imageIcon="'/nuxt3/images/icons/blender.png'"
        :productId="'product_4'"
        :class="className"
      />
      <Card
        :imagePath="'/nuxt3/images/thumb/touchnumber.png'"
        :cardName="'Touch Number'"
        :imageIcon="'/nuxt3/images/icons/vuejs.png'"
        :productId="'product_5'"
        :class="className"
      />
      <Card
        :imagePath="'/nuxt3/images/thumb/monsterbattle.png'"
        :cardName="'Monster Battle'"
        :imageIcon="'/nuxt3/images/icons/html5.png'"
        :productId="'product_6'"
        :class="className"
      />
    <div class="main">
      <!-- <Card
        :imagePath="'/nuxt3/_nuxt/assets/images/thumb/html5game.png'"
      /> -->
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style>
.container {
  width: 276px;
  padding: 10px;
  margin: auto;
  position: relative;
}
.product{
  padding-top: 140px;
  z-index: 100;
  overflow-wrap: break-word;
  font-family: "PixelMplus10";
  font-size: 10px;
}
.product h2{
  font-size: 12px;
  font-family: "PixelMplus10";
}
.product .OtherURL{
  font-size: 10px;
  line-height: 14px;
  display: inline-block;
}
.product article img{
  margin: 5px 0 5px 0;
}
.cardClose{
  display: none;
}
.cardClose.active{
  display: block;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  cursor: pointer;
}
</style>
<script setup>
const route = useRoute();
const router = useRouter();
const className = ref('');
const closeBtn = ref('');
// watch(route, () => {
//   console.log("route", route.path);
//   if (route.path.includes("product_")) {
//     className.value = "hidden";
//   }
// });
const CardClose = () => {
  router.push('/');
};
watch(() => route.path, (newPath) => {
    // currentPath.value = newPath;
  // ここで必要な処理を実行する
  console.log("route.path", route.path)
  if (route.path.includes("product_")) {
    console.log("product page")
    className.value = "cardAllHidden";
    closeBtn.value = "active";
  } else {
    className.value = "";
    closeBtn.value = "";
  }
});
</script>
