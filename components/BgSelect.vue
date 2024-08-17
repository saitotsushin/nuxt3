<template>
  <div class="BgSelect font-bit">
    <div class="BgSelectColor" @click="BgSelectClick" :style="{ backgroundColor: selectedColor }"></div>
    <ul v-if="isBgSelected" class="BgSelectList">
      <li v-for="(item, index) in bgList" :key="index">
        <img :src="item.bgImageThumb" @click="SelectBgThumb(item,index)" :class="{ 'selected': item.isSelected }"/>
        <span class="border"></span>
      </li>      
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedBg: '/nuxt3/images/bg.png',
      selectedColor: "#cf5aba",
      isBgSelected: false,
      bgList: [
      {
          color: "#cf5aba",
          bgImage: '/nuxt3/images/bg.png',
          bgImageThumb: '/nuxt3/images/bg-thumb.png',
          isSelected: true
        },
        {
          color: "#639cc7",
          bgImage: '/nuxt3/images/bg1.png',
          bgImageThumb: '/nuxt3/images/bg1-thumb.png',
          isSelected: false
        },
        {
          color: "#5f87b1",
          bgImage: '/nuxt3/images/bg2.png',
          bgImageThumb: '/nuxt3/images/bg2-thumb.png',
          isSelected: false
        },
        {
          color: "#72a882",
          bgImage: '/nuxt3/images/bg3.png',
          bgImageThumb: '/nuxt3/images/bg3-thumb.png',
          isSelected: false
        },
        {
          color: "#f2c6b7",
          bgImage: '/nuxt3/images/bg4.png',
          bgImageThumb: '/nuxt3/images/bg4-thumb.png',
          isSelected: false
        },
        {
          color: "#a5b5c6",
          bgImage: '/nuxt3/images/bg5.png',
          bgImageThumb: '/nuxt3/images/bg5-thumb.png',
          isSelected: false
        },
        {
          color: "#eb9358",
          bgImage: '/nuxt3/images/bg6.png',
          bgImageThumb: '/nuxt3/images/bg6-thumb.png',
          isSelected: false
        },
        {
          color: "#eaa30d",
          bgImage: '/nuxt3/images/bg7.png',
          bgImageThumb: '/nuxt3/images/bg7-thumb.png',
          isSelected: false
        },
      ]
    };
  },  
  mounted() {
  },
  watch: {
  },
  methods: {
    BgSelectClick() {
      if (this.isBgSelected) {
        this.isBgSelected = false;        
      } else {
        this.isBgSelected = true;
      }
    },
    SelectBgThumb(_item,_index) {
      this.selectedColor = _item.color;
            
      for (let i = 0; i < this.bgList.length; i++) {
        this.bgList[i].isSelected = false;
      }    
      this.bgList[_index].isSelected = true;  
      this.$emit('bg-selected', {
        color: _item.color,
        bgImage: _item.bgImage,
      });      
    }
  }
}
</script>
<style scoped>
.BgSelectList{
  position: absolute;
  top: 16px;
  right: 0px;
  padding: 8px;
  border-radius: 8px;
  background-color: #ede8e7;
  box-shadow: 0px 14px 22px -7px rgba(0, 0, 0, 0.33);  
}
.BgSelectList li{
  list-style-type: none;
  margin: 2px 0;
  display: block;
  position: relative;
}
.BgSelectList li img{
  width: 60px;
  display: block;
  z-index: 1;
}
.BgSelectList li img + .border{
  display: none;
}
.BgSelectList li img.selected + .border{
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid rgba(255, 255, 255, 0.56) !important;
  z-index: 2;
  top:0%;
  left: 0;
  background-color: #ffffff58;
}
.Bg{
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background-size: contain;
}
.BgSelect{
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 10;
}
.BgSelectColor{
  width: 20px;
  height: 10px;
  border: 1px solid #FFF;
  background-color: #d400f0e7;
}
</style>