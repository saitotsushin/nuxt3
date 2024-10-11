<template>
  <div class="DebugUI" :class="{ 'isActive': componentStore.isDebug }">
    DEBUG
  </div>
</template>
<script setup>
const componentStore = useComponentStore()
</script>