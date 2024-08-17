<template>
  <div class="l-sneaker-thumb-box">
    <div class="sneaker-thumb-s">
      <div class="sneaker-thumb-name-s">
        <div class="sneaker-thumb-name-text-s">
          <div class="nameList ft-1">
            <span>NIKE</span>
          </div>
          <div class="nameList ft-1">
            <span>DUNK</span>
          </div>
          <div class="nameList ft-1">
            <span>LOW</span>
          </div>
          <div class="nameList ft-2">
            <span>PRO B</span>
          </div>
        </div>
      </div> 
      <div class="sneaker-thumb-image">
        <img src="~/assets/images/s_1.png" ref="targetSneakerImage"/>
      </div>
      <div class="sneaker-thumb-bg"></div>
    </div>
    <div class="sneaker-logo-box">

    </div>
  </div>
</template>
<style>
</style>
<script setup>

</script>
<style lang="scss">
.sneaker-logo-box{
  background-color: #CCC;
  padding: 4vw;
  border-radius: 4vw;
}
.sneaker-thumb-s{
  width: 40vw;
  padding: 14vw 2vw 2vw 2vw;
}
.sneaker-thumb-name-s{
  position: absolute;
  top: 0;
  left: 2vw;
  z-index: 10;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-style: normal;
  line-height: 0.9;
  font-size: 8vw;
}
.sneaker-thumb-name-text-s{
  .nameList{
    display: flex;
    &.ft-1{
      font-size: 7vw;
    }
    &.ft-2{
      font-size: 4vw;
    }
  }
}
.sneaker-thumb-image{
  position: relative;
  z-index: 20;
  img{
    width: 100%;
  }
}
.sneaker-thumb-bg{
  border-radius: 4vw;
  background-color: #3c68a0;
  width: 100%;
  height: calc(100% - 4vw);
  position: absolute;
  margin: 4vw 0 0 0;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>