<template>
  <NuxtLink :to="{path: `${productId}`}" class="card">
      <div class="cardHeader">
        <div class="cardIcon">
          <img :src="imageIcon" alt="Image"/>
        </div>
        <h2 class="font-bit">{{ cardName }}</h2>
      </div>
      <div class="cardThumb">
        <img :src="imagePath" alt="Image"/>
      </div>
  </NuxtLink>
</template>
<script>
export default {
  props: ['imagePath','cardName','imageIcon','productId'],
  methods: {
  }
};
</script>
<style>
.card {
  border-radius: 10px;
  overflow: hidden;
  height: 130px;
  background-color: #373737;
  display: block;
  margin-bottom: 10px;
  box-shadow: 0px 14px 22px -7px rgba(0, 0, 0, 0.33);
  cursor: pointer;
  transition: 0.4s ease-in-out;
  top: 0px;
  left: 0;
}
.card *{
  transition: 0.4s ease-in-out;
}
/* .card:hover{
  cursor: pointer;
} */
.cardHeader{
  display: flex;
  height: 30px;
  padding: 8px;
  z-index: 20;
}
.cardIcon{
  margin-right: 10px;
}
.cardHeader h2{
  font-size: 10px;
  font-weight: normal;
}
.card.router-link-active{
  display: block !important;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.card.router-link-active .cardThumb{
  height: auto;
}
.card.router-link-active .cardThumb img{
  position: relative;
}
.cardThumb{
  height: 100px;
  overflow: hidden;
  z-index: 10;
}
.cardThumb img{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: block;
  width: 100%;
}
.cardAllHidden{
  display: none;
}
</style>