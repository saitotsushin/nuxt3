<template>
  <div class="nextLink">
    <NuxtLink :to="`/sneaker/${modelIndex}`" @click="showPage">
      NEXT PAGE
    </NuxtLink>    
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: String,    // 親コンポーネントから渡される title プロップ
  cgPath: String, // 親コンポーネントから渡される cgPath プロップ
  mainColor: String,
  modelIndex: Number
})
const componentStore = useComponentStore()

const showPage = () => {
  componentStore.showPage(Number(props.modelIndex));
}
</script>
<style>
.nextLink{
  padding: 40px;
  width: 100%;
  text-align: center;
}
</style>