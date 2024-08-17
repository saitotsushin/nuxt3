<template>
  <div class="wrapper" >
    <slot />
  </div>
</template>

<script setup>

</script>
<style>
/* トランジション用のスタイル */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
