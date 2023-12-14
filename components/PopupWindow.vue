<template>
    <div class="modalwindow"
      :style="{
        top: dragInfo.top + 'px',
        left: dragInfo.left + 'px',
        width: resizableInfo.width + 'px',
        height: resizableInfo.height + 'px',
        position: resizableInfo.position,
        margin: resizableInfo.margin,
        display: modalDisplay
      }"
      ref="MyContainer"
    >
      <div class="btnClose" @click="popuClose"></div>
      <div class="PopupWindowHeader" @mousedown="startDrag">{{title }}</div>
      <div class="popupContens">
        <div class="popupContensInner">
          <div v-html="contentsList"></div>
        </div>
        <div class="rightBar" @mousedown="startResizeX"><span></span></div>
        <div class="bottomBar" @mousedown="startResizeY"><span></span></div>
        <div class="resizeXYbar" @mousedown="startResizeXY"></div>   
      </div>   
    </div>
</template>
<script setup>
const props = defineProps(['contentsList','title']);

const MyContainer = ref(null);
const dragInfo = ref({
  isDragging: false,
  startX: 0,
  startY: 0,
  top: 20,
  left: 0,
});
const startDrag = (event) => {
  dragInfo.value.isDragging = true;
  dragInfo.value.startX = event.clientX - dragInfo.value.left;
  dragInfo.value.startY = event.clientY - dragInfo.value.top;

  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', endDrag);
};

const dragMove = (event) => {
  if (dragInfo.value.isDragging) {
    dragInfo.value.left = event.clientX - dragInfo.value.startX;
    dragInfo.value.top = event.clientY - dragInfo.value.startY;
  }
};

const endDrag = () => {
  dragInfo.value.isDragging = false;
  document.removeEventListener('mousemove', dragMove);
  document.removeEventListener('mouseup', endDrag);
};

const resizableInfo = ref({
  isResizing: false,
  startX: 0,
  startWidth: 0,
  startY: 0,
  startHeight: 0,      
  width: 480, // 初期の横幅
  height: 500,
  position: "relative",
  margin: "auto"
});

const startResizeX = (event) => {
  resizableInfo.value.isResizing = true;
  resizableInfo.value.startX = event.clientX;
  resizableInfo.value.startWidth = resizableInfo.value.width;
  resizableInfo.value.position = "absolute";
  resizableInfo.value.margin = "0";

  document.addEventListener('mousemove', resizeX);
  document.addEventListener('mouseup', endResizeX);
};
const startResizeY = (event) => {
  resizableInfo.value.isResizing = true;
  resizableInfo.value.startY = event.clientY;
  resizableInfo.value.startHeight = resizableInfo.value.height;
  resizableInfo.value.position = "absolute";

  document.addEventListener('mousemove', resizeY);
  document.addEventListener('mouseup', endResizeY);
};
const startResizeXY = (event) => {
  resizableInfo.value.isResizing = true;
  resizableInfo.value.startX = event.clientX;
  resizableInfo.value.startWidth = resizableInfo.value.width;
  resizableInfo.value.startY = event.clientY;
  resizableInfo.value.startHeight = resizableInfo.value.height;

  document.addEventListener('mousemove', resizeXY);
  document.addEventListener('mouseup', endResizeXY);
};
const resizeX = (event) => {
  if (resizableInfo.value.isResizing) {
    const newWidth = resizableInfo.value.startWidth + (event.clientX - resizableInfo.value.startX);
    resizableInfo.value.width = Math.max(50, newWidth); // 最小横幅を設定
  }
};
const resizeY = (event) => {
  if (resizableInfo.value.isResizing) {
    const newHeight = resizableInfo.value.startHeight + (event.clientY - resizableInfo.value.startY);
    resizableInfo.value.height = Math.max(50, newHeight); // 最小横幅を設定
  }
};
const resizeXY = (event) => {
  if (resizableInfo.value.isResizing) {
    const newWidth = resizableInfo.value.startWidth + (event.clientX - resizableInfo.value.startX);
    resizableInfo.value.width = Math.max(50, newWidth); // 最小横幅を設定
    const newHeight = resizableInfo.value.startHeight + (event.clientY - resizableInfo.value.startY);
    resizableInfo.value.height = Math.max(50, newHeight); // 最小横幅を設定
    resizableInfo.value.height = newWidth;
    resizableInfo.value.height = newHeight;
  }
};
const endResizeX = () => {
  resizableInfo.value.isResizing = false;
  document.removeEventListener('mousemove', resizeX);      
  document.removeEventListener('mouseup', endResizeX);
};
const endResizeY = () => {
  resizableInfo.value.isResizing = false;
  document.removeEventListener('mousemove', resizeY);      
  document.removeEventListener('mouseup', endResizeY);
};
const endResizeXY = () => {
  resizableInfo.value.isResizing = false;
  document.removeEventListener('mousemove', resizeXY);      
  document.removeEventListener('mouseup', endResizeXY);
};
// const screenWidth = ref(window.innerWidth);
// const screenHeight = ref(window.innerHeight);

// ウィンドウのリサイズイベントを監視
// const handleResize = () => {
//   screenWidth.value = window.innerWidth;
//   screenHeight.value = window.innerHeight;
// };

onMounted(() => {
  // コンポーネントがマウントされたときにリサイズイベントを追加
  // window.addEventListener('resize', handleResize);
  // マウント後にDOMの位置を取得
  const element = MyContainer.value;
  // dragInfo.value.top = element.offsetTop;
  dragInfo.value.left = window.innerWidth / 5 * 3;
  resizableInfo.value.width = window.innerWidth / 5 * 2 - 20;
  resizableInfo.value.position = "absolute";
  resizableInfo.value.margin = "0";
});
// コンポーネントがアンマウントされるときにリサイズイベントを削除
// onBeforeUnmount(() => {
//   window.removeEventListener('resize', handleResize);
// });

const modalDisplay = computed(() => {
  console.log("contentsList",props.contentsList);
  return props.contentsList == "" ? 'none' : 'block';
});

const emit = defineEmits(['change', 'delete','rewrite']);//<-必須
// イベントを発火する関数
const popuClose = () => {
  emit('popup-clicked',false);
};

// const popuClose = () => {
//   console.log("popuClose");
//   emit('popup-clicked',{
//         contents: this.contentsList
//       });
// };
</script>
<style>
.modalwindow{
  border-radius: 12px;
  background-color: #FFF;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  color: #454443;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: relative;
  margin: auto;
  box-shadow: 0px 14px 22px -7px rgba(0, 0, 0, 0.33);
  overflow: hidden;
  width: 300px;
  display: none;
}
.PopupWindowHeader{
  padding: 8px 12px;
  font-size: 12px;
  font-weight: bold;
}
.popupContens{
  height: calc(100% - 34px);
  
}
.popupContens img{
  width: 100%;
  display: block;
}
.popupContens p{
  padding: 10px;
  font-size: 12px;
  letter-spacing: 1px;
}
.popupContensInner{
  overflow-y: scroll;
  height: 100%;
}
</style>