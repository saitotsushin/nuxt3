<template>
  <div class="switchQualityBox">
    <div class="switchQuality">
      <div class="switchQualityName">
        ABOUT {{ isOn }}
      </div>
      <label class="toggle-button" @click="toggle">
        <input type="checkbox"/>
      </label>
    </div>
  </div>
</template>
<script setup>
// トグル状態を管理するリアクティブな変数
const isOn = ref(false)

// トグル関数
const toggle = () => {
  isOn.value = !isOn.value
  console.log("isOn.value",isOn.value)
}
</script>