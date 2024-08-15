<template>
  <div class="sneakerThumb" ref="targetElement" :class="{ 'isActive': visible }">
    <div class="sneakerThumbName">
      <!-- <div class="sneakerThumbNameText sneakerThumbName1" ref="targtSneakerThumbName1">
        <span v-for="(char, index) in chars" :key="index">{{ char }}</span>
      </div> -->
      <div class="sneakerThumbNameText sneakerThumbName2" ref="targtSneakerThumbName2">
        <span>NIKE</span>
        <span>AIR</span>
        <span>JORDAN 1</span>
      </div>
    </div> 
    <div class="sneakerThumbImage">
      <img src="~/assets/images/1.png"/>
    </div>
    <div class="sneakerThumbBg"></div>
  </div>
</template>
<script setup>
const props = defineProps({
  name: String,
  count: Number
});
const targetElement = ref(null); // 監視対象の要素
const targtSneakerThumbName2 = ref(null); // 監視対象の要素
const displayedChars1 = ref([]);

const visible = ref(false);

const text = props.name; // 初期テキスト
const chars = ref([]); // 文字を保持する配列

function handleIntersect(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 必要に応じて、ここで他のアクションを実行する
      if (visible.value == false) {
        visible.value = true;
        displayName();
      }
    }
  });
}
function displayName() {
  const children = targtSneakerThumbName2.value;
  const spans = children.querySelectorAll('span');
  // 各 span のテキストから1文字ずつ抽出して表示
  children.innerHTML = '';
  
  spans.forEach((span, i) => {
    var setSpans = [];

    const words = span.textContent.split('');
    words.forEach((child, j) => {
      const spanElement = document.createElement('span');
      if (child == " ") {
        spanElement.classList.add('spacer');
      }
      spanElement.textContent = child;
      setSpans.push(spanElement);
    });
    const divElement = document.createElement('div');
    divElement.classList.add('name_list');
    for (var k = 0; k < setSpans.length; k++){
      divElement.appendChild(setSpans[k]);
    }
    children.appendChild(divElement);
  });  

  const divs = children.querySelectorAll('div');
  divs.forEach((div, i) => {
    const spa = div.querySelectorAll('span');
    spa.forEach((spa_t, k) => {
      setTimeout(() => {
        spa_t.style.display = "block" // 指定したタイミングで文字を表示
      }, k * 100 + i * 500); // 200ms 間隔で表示
    });
  });
}

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersect, {
    root: null, // ビューポートを基準とする
    rootMargin: '0% 0px -30% 0px', // 上部20%をトリガー領域に設定
    threshold: 0 // 0%表示された時点でトリガーする
  });

  if (targetElement.value) {
    observer.observe(targetElement.value);
  }
  chars.value = text.split('');

  onUnmounted(() => {
    if (targetElement.value) {
      observer.unobserve(targetElement.value);
    }
  });
});
</script>

<style lang="scss">
.sneakerThumb *{
  transition: 0.25s cubic-bezier(.445, .05, .55, .95);
}
.name_list{
  display: flex;
}
.sneakerThumbNameText{
  // display: flex;
  font-size: 14vw;
  z-index: 10;
  color: #000;
}
.sneakerThumbNameText span{
  display: none;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-style: normal;
  line-height: 1;
}
.spacer{
  margin-right: 2rem;
}
.sneakerThumb{
  height: 60vw;
  &:hover{
    .sneakerThumbBg{
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      border-radius: 0;
    }
    .sneakerThumbImage{
      top: 20px;
    }
  }
  .sneakerThumbName{
    position: absolute;
    top: 0;
    left: 0;
  }
  .sneakerThumbBg{
    background-color: #D9D9D9;
    display: block;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    border-radius: 40px;
  }
  .sneakerThumbImage{
    z-index: 2;
    top: 10px;
    right: 45px;
    img{
      display: block;
      width: 64%;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>