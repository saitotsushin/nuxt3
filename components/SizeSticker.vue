<template>
  <div class="l-sizeSticker font-bit-bold">
    <div class="l-sizeSticker-innner">
      <div class="l-jan-code"><img src="/images/jan_3110241464916 1.svg" class="c-jan-code"/></div>
      <div class="sizeListWrap">
        <div class="sizeListName">
          <span ref="name_1"></span>
          <span ref="name_2"></span>
          <span ref="name_3"></span>
          <span ref="name_4"></span>
          <span ref="name_5"></span>
          <span ref="name_6"></span>
          <span ref="name_7"></span>
          <span ref="name_8"></span>
          <span ref="name_9"></span>
          <span ref="name_10"></span>
          <span ref="name_11"></span>
          <span ref="name_12"></span>
        </div>
        <div class="sizeListBox">
          <div class="sizeList sizeUS">
            <div class="sizeName sizeUS_name">
              <span ref="sizeUSname_1"></span>
              <span ref="sizeUSname_2"></span>
            </div>
            <div class="sizeNumb sizeUS_number">
              <span ref="sizeUS_1"></span>
              <span>.</span>
              <span ref="sizeUS_2"></span></div>
          </div>
          <div class="sizeList sizeJP">
            <div class="sizeName sizeJP_name">
              <span ref="sizeJPname_1"></span>
              <span ref="sizeJPname_2"></span>
            </div>
            <div class="sizeNumb sizeJP_number">
              <span ref="sizeJP_1"></span>
              <span ref="sizeJP_2"></span>
              <span>.</span>
              <span ref="sizeJP_3"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sizeUSname_1: Ref<HTMLElement> = ref(null!);
const sizeUSname_2: Ref<HTMLElement> = ref(null!);
const sizeJPname_1: Ref<HTMLElement> = ref(null!);
const sizeJPname_2: Ref<HTMLElement> = ref(null!);
const sizeUS_1: Ref<HTMLElement> = ref(null!);
const sizeUS_2: Ref<HTMLElement> = ref(null!);
const sizeJP_1: Ref<HTMLElement> = ref(null!);
const sizeJP_2: Ref<HTMLElement> = ref(null!);
const sizeJP_3: Ref<HTMLElement> = ref(null!);
const name_1: Ref<HTMLElement> = ref(null!);
const name_2: Ref<HTMLElement> = ref(null!);
const name_3: Ref<HTMLElement> = ref(null!);
const name_4: Ref<HTMLElement> = ref(null!);
const name_5: Ref<HTMLElement> = ref(null!);
const name_6: Ref<HTMLElement> = ref(null!);
const name_7: Ref<HTMLElement> = ref(null!);
const name_8: Ref<HTMLElement> = ref(null!);
const name_9: Ref<HTMLElement> = ref(null!);
const name_10: Ref<HTMLElement> = ref(null!);
const name_11: Ref<HTMLElement> = ref(null!);
const name_12: Ref<HTMLElement> = ref(null!);

const randamText = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "@", "[", "_"
  , "]", "¥", "?", "!", "&", "$", "#", "=", "*", "+", "}", "{", ">", "<", "/"
  , "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"
  , "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]
const ShowRandomText = (_elem:Ref<HTMLElement>,_time:number,_text:string) => {
  const intervalId = setInterval(function () {
    let _textIndex = Math.floor(Math.random() * randamText.length);
    if (_elem.value) {
      _elem.value.textContent = randamText[_textIndex];
    }
  }, 80); // 1000ミリ秒 (1秒) ごとに繰り返し実行
  // 5秒後に繰り返しを停止する
  setTimeout(function () {
    clearInterval(intervalId);
    _elem.value.textContent = _text;
  }, _time); // 5000ミリ秒 (5秒) 後に停止
}
onMounted(() => {
  ShowRandomText(sizeUSname_1,500,"U")
  ShowRandomText(sizeUSname_2,600,"S")
  ShowRandomText(sizeJPname_1,550,"C")
  ShowRandomText(sizeJPname_2,600,"M")
  ShowRandomText(sizeUS_1, 1200, "9")
  ShowRandomText(sizeUS_2,1000,"5")
  ShowRandomText(sizeJP_1,1100,"2")
  ShowRandomText(sizeJP_2,1050,"7")
  ShowRandomText(sizeJP_3,1000,"5")
  ShowRandomText(name_1,800,"S")
  ShowRandomText(name_2,850,"A")
  ShowRandomText(name_3,800,"I")
  ShowRandomText(name_4,900,"T")
  ShowRandomText(name_5,1000,"O")
  ShowRandomText(name_6,950,"T")
  ShowRandomText(name_7,750,"S")
  ShowRandomText(name_8,800,"U")
  ShowRandomText(name_9,1050,"S")
  ShowRandomText(name_10,900,"H")
  ShowRandomText(name_11,800,"I")
  ShowRandomText(name_12,850,"N")
});
</script>