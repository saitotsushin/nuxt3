<template>
  <div class="c-sneakerTitle" ref="SneakerName"></div>
</template>
<script setup>
const SneakerName = ref(null);
const props = defineProps({
  title: String,
  isActive: {
    type: Boolean,
    default: false
  }
})
let isShow = false;
watch(() => props.isActive, (newValue) => {
  if (newValue === true) {
    displayName();
    isShow = true;
  } else {
  }
  
});
const displayName = () => {
  if (isShow) {
    return;
  }

  SneakerName.value.innerHTML = "";
  const titleWoards = props.title.split("");
  var setSpans = [];

  titleWoards.forEach((word, i) => {
    const spanElement = document.createElement('span');
    if (word == " ") {
      spanElement.classList.add('nameSpacer');
    }
    spanElement.textContent = word;
    setSpans.push(spanElement);
  });
  const divElement = document.createElement('div');
  divElement.classList.add('nameList');
  setSpans.forEach((word, i) => {
    divElement.appendChild(setSpans[i]);
  });
  SneakerName.value.appendChild(divElement);
  const spa = divElement.querySelectorAll('span');
  spa.forEach((spa_t, k) => {
    setTimeout(() => {
      spa_t.style.display = "block" // 指定したタイミングで文字を表示
    }, k * 100); // 200ms 間隔で表示
  });
}
</script>