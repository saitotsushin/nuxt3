<template>
  <div class="switchQualityBox">
    <div class="switchQuality">
      <div class="switchQualityName">
        ABOUT
      </div>
      <label class="toggle-button">
        <input type="checkbox" @click="toggle"/>
      </label>
    </div>
  </div>
</template>
<script setup>
const componentStore = useComponentStore()

// トグル状態を管理するリアクティブな変数
const isOn = ref(false)

// トグル関数
const toggle = () => {
  isOn.value = !isOn.value
  componentStore.switchDebug(isOn.value);
}
</script>