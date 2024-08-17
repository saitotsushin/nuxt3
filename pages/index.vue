<template>
  <div>
    <Box3D/>
    <SneakerThumb
      name="SN NIKE AIR J"
      color="#000000">
      <template v-slot:sneakerName>
        <span>NIKE</span>
        <span>AIR</span>
        <span>JORDAN 2</span>
      </template>
    </SneakerThumb>
    <!-- <SneakerThumb2/> -->
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
    </div>


</template>

<script setup>
const MainColumHeader = ref("/");
const messages = 'Hello from Parent Component'
const items = ref([
]);
</script>
