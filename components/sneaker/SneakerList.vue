<template>
  <li @click="handleClick">
    <span>
      <img :src="thumb"/>
    </span>
    <p>{{ name }}</p>
  </li>
</template>
<script>
export default {
  props: ['name','thumb'],
  methods: {
    handleClick() {
      // クリックイベントを親に伝える
      this.$emit('item-clicked', {
        name: this.name,
        thumb: this.thumb
      });
    }  
  }
};
</script>