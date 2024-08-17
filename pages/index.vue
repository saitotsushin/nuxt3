<template>
  <div>
    <Box3D/>
    <SneakerThumb
      name="NIKE AIR JORDAN 1"
      mainColor="#000000"
      subColor="#234C93"
      imagePath="/nuxt3/images/thumb/1.png"
      >
      <template v-slot:sneakerName>
        <span>NIKE</span>
        <span>AIR</span>
        <span>JORDAN 1</span>
      </template>
    </SneakerThumb>
    <SneakerThumb
      name="NIKE DUNK LOW PRO b"
      mainColor="#4177AA"
      subColor="#6687a6"
      imagePath="/nuxt3/images/thumb/2.png"
      >
      <template v-slot:sneakerName>
        <span>NIKE</span>
        <span>DUNK LOW</span>
        <span>PRO b</span>
      </template>
    </SneakerThumb>

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
