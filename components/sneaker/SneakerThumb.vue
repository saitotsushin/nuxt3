<template>
  <div class="sneakerThumb" ref="targetElement" :class="{ 'isActive': visible }">
    <div class="sneakerThumbName">
      <div class="sneakerThumbNameText sneakerThumbName2" ref="targtSneakerThumbName2">
        <span>NIKE</span>
        <span>AIR</span>
        <span>JORDAN 1</span>
      </div>
    </div> 
    <div class="sneakerThumbImage">
      <img src="~/assets/images/1.png" ref="targetSneakerImage"/>
    </div>
    <div class="sneakerThumbBg"></div>
  </div>
</template>
<style>
</style>
<script setup>
const props = defineProps({
  name: String,
  count: Number
});
const targetElement = ref(null); // 監視対象の要素
const targtSneakerThumbName2 = ref(null); // 監視対象の要素
const targetSneakerImage = ref(null); // 監視対象の要素
const displayedChars1 = ref([]);

const cursorPos = ref({x:0,y:0}); // 監視対象の要素

const visible = ref(false);
const visible2 = ref(false);

const text = props.name; // 初期テキスト
const chars = ref([]); // 文字を保持する配列

function handleIntersect(entries) {
  console.log("handleIntersect");
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 必要に応じて、ここで他のアクションを実行する
      if (visible.value == false) {
        visible.value = true;
        targetElement.value.classList.add("isActive");
      }
    }
  });
}
function handleIntersectName(entries) {
  console.log("handleIntersectName",entries);
  entries.forEach(entry => {
    console.log("entry", entry.isIntersecting);
    if (entry.isIntersecting) {
      // 必要に応じて、ここで他のアクションを実行する
      if (visible2.value == false) {
        visible2.value = true;
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
        spanElement.classList.add('nameSpacer');
      }
      spanElement.textContent = child;
      setSpans.push(spanElement);
    });
    const divElement = document.createElement('div');
    divElement.classList.add('nameList');
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
const DIG_MAX_W = 10;
const DIG_MAX_H = 10;

let timeoutId;
const idleTime = 100;

const handleMouseMove = (e) => {
  const w_deg = window.innerWidth * 0.5 / DIG_MAX_W;
  const h_deg = window.innerHeight * 0.5 / DIG_MAX_H;
  var x = e.screenX - window.innerWidth * 0.5;
  var y = e.screenY - window.innerHeight * 0.5;
  cursorPos.value.x = x;
  cursorPos.value.y = y;
  var rx = x / w_deg;
  var ry = y / h_deg * -1.0;
  targetSneakerImage.value.style.transform = "rotateX(" + ry + "deg) rotateY(" + rx + "deg)";
}

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersect, {
    root: null, // ビューポートを基準とする
    rootMargin: '0% 0px -40% 0px', // 上部20%をトリガー領域に設定
    threshold: 0 // 0%表示された時点でトリガーする
  });

  if (targetElement.value) {
    observer.observe(targetElement.value);
  }

  const observerName = new IntersectionObserver(handleIntersectName, {
    root: null, // ビューポートを基準とする
    rootMargin: '0% 0px -60% 0px', // 上部20%をトリガー領域に設定
    threshold: 0 // 0%表示された時点でトリガーする
  });

  if (targtSneakerThumbName2.value) {
    observerName.observe(targtSneakerThumbName2.value);
  }

  
  window.addEventListener('mousemove', handleMouseMove);

  onUnmounted(() => {
    if (targetElement.value) {
      observer.unobserve(targetElement.value);
    }
  });
});
</script>
<style lang="scss">
.sneakerThumb{

}
</style>