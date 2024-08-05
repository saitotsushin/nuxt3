<template>
  <Box3D/>
  <ul>
    <li><img src="~/assets/images/1.jpg"/></li>
    <li><img src="~/assets/images/2.jpg"/></li>
    <li><img src="~/assets/images/3.jpg"/></li>
    <li><img src="~/assets/images/4.jpg"/></li>
    <li><img src="~/assets/images/5.jpg"/></li>
    <li><img src="~/assets/images/6.jpg"/></li>
    <li><img src="~/assets/images/7.jpg"/></li>
    <li><img src="~/assets/images/8.jpg"/></li>
    <li><img src="~/assets/images/9.jpg"/></li>
    <li><img src="~/assets/images/10.jpg"/></li>
    <li><img src="~/assets/images/11.jpg"/></li>
    <li><img src="~/assets/images/12.jpg"/></li>
    <li><img src="~/assets/images/13.jpg"/></li>
    <li><img src="~/assets/images/14.jpg"/></li>
    <li><img src="~/assets/images/15.jpg"/></li>
    <li><img src="~/assets/images/16.jpg"/></li>
    <li><img src="~/assets/images/17.jpg"/></li>
    <li><img src="~/assets/images/18.jpg"/></li>
    <li><img src="~/assets/images/19.jpg"/></li>
    <li><img src="~/assets/images/20.jpg"/></li>
    <li><img src="~/assets/images/21.jpg"/></li>
    <li><img src="~/assets/images/22.jpg"/></li>
    <li><img src="~/assets/images/23.jpg"/></li>
    <li><img src="~/assets/images/24.jpg"/></li>
    <li><img src="~/assets/images/25.jpg"/></li>
    <li><img src="~/assets/images/26.jpg"/></li>
    <li><img src="~/assets/images/27.jpg"/></li>
    <li><img src="~/assets/images/28.jpg"/></li>
    <li><img src="~/assets/images/29.jpg"/></li>
    <li><img src="~/assets/images/30.jpg"/></li>
    <li><img src="~/assets/images/31.jpg"/></li>
    <li><img src="~/assets/images/32.jpg"/></li>
    <li><img src="~/assets/images/33.jpg"/></li>
    <li><img src="~/assets/images/34.jpg"/></li>
  </ul>
</template>
<style lang="scss" scoped>
ul{
  display: block;
  li{
    display: block;
    img{
      display: block;
      width: 100%;
    }
  }
}
.container{
  /* 何かしらstyleがないとエラーになる... */
}
</style>

<script setup>
const MainColumHeader = ref("/");
const items = ref([
]);
</script>
