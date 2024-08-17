<template>
  <Box3D/>
  <SneakerThumb/>
  <SneakerThumb2/>
  <div class="l-thumbs">
   <SneakerThumb_s/>
   <SneakerThumb_s2/>
   <SneakerThumb_s2/>
  </div>
  <Column/>
  <div class="l-thumbs-s">
   <SneakerThumb_s_s/>
   <SneakerThumb_s_s/>
   <SneakerThumb_s_s/>
   <SneakerThumb_s_s/>
   <SneakerThumb_s_s/>
   <SneakerThumb_s_s/>
   <SneakerThumb_s_s/>
   <SneakerThumb_s_s/>
  </div>

</template>

<script setup>
const MainColumHeader = ref("/");
const messages = 'Hello from Parent Component'
const items = ref([
]);
</script>
