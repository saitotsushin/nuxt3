<template>
    <li @click="handleClick">
        <span class="folderIcon"><img :src="imagePath"></span>
        <span>{{dirName}}</span>
    </li>
</template>
<script>
export default {
  props: ['dirName', 'columnList','contentsList','dirNumber'],
  data() {
    return {
      imagePath: ''
    };
  },  
  mounted() {
    this.setImagePath();
  },
  watch: {
    // リストの変更を監視
    columnList: {
      handler(newValue, oldValue) {
        // ここで特定の処理を実行
        this.setImagePath();
      }
    } 
  },
  methods: {
    setImagePath() {
      if (this.columnList) {
        this.imagePath = '/nuxt3/images/icons/s-2.png';
      } else {
        this.imagePath = '/nuxt3/images/icons/s-1.png';
      }
    },
    handleClick() {
      // クリックイベントを親に伝える
      this.$emit('item-clicked', {
        dirName: this.dirName,
        columnList: this.columnList,
        contents: this.contentsList,
        dirNumber: this.dirNumber
      });
    }
  }
}
</script>

