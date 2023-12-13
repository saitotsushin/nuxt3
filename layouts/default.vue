<template>
  <div class="wrapper">
    <Header />
    <div
      class="container"
      :style="{
        top: dragInfo.top + 'px',
        left: dragInfo.left + 'px',
        width: resizableInfo.width + 'px',
        height: resizableInfo.height + 'px',
        position: resizableInfo.position,
        margin: resizableInfo.margin
      }"
      ref="MyContainer"
    >
      <div class="MainHeader draggable" @mousedown="startDrag">
        <img src="~/assets/images/player.png" alt="Discover Nuxt 3" />
      </div>
      <div class="Main">
        <div class="MainColumHeader draggable" @mousedown="startDrag">MainColumnHeader</div>
        <div class="MainColumn">
          <div class="Column">
            Column
          </div>
          <div class="Column">
            Column
          </div>
          <div class="Column">
            Column
          </div>
        </div>
        <slot />
      </div>
      <div class="rightBar" @mousedown="startResizeX"></div>
      <div class="bottomBar" @mousedown="startResizeY"></div>
      <div class="resizeXYbar" @mousedown="startResizeXY"></div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.resizeXYbar{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  background-color: #000;
}
.rightBar{
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  height: 100%;
  background-color: #F00;
}
.bottomBar{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 10px;
  background-color: #F00;
}
.wrapper{
  background-image: url('/nuxt3/images/10-6--thumb.png');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  max-width: 920px;
  max-height: 460px;
  margin: auto;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 14px 22px -7px rgba(0, 0, 0, 0.33);  
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
	.MainHeader {
    width: 180px;
    background-color: rgba(229, 229, 229, 0.2);;
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
	}
  .Main{
    width: 100%;
    background-color: #ffffff;
  }
  .MainColumHeader{
    background-color: #faf4f2;
    width: 100%;
    padding: 20px;
  }
  .MainColumn{
    display: flex;
  }
  .Column{
    width: calc(100% / 3);
  }
}
.draggable:hover{
  cursor: grab;
}
</style>

<script setup>
const dragInfo = ref({
  isDragging: false,
  startX: 0,
  startY: 0,
  top: 0,
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
  width: 920, // 初期の横幅
  height: 460,
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

const MyContainer = ref(null);
onMounted(() => {
  // マウント後にDOMの位置を取得
  const element = MyContainer.value;
  dragInfo.value.top = element.offsetTop;
  dragInfo.value.left = element.offsetLeft;
  resizableInfo.value.position = "absolute";
  resizableInfo.value.margin = "0";
});
const route = useRoute();
const router = useRouter();
const className = ref('');
const closeBtn = ref('');

// watch(() => route.path, (newPath) => {
//   // ここで必要な処理を実行する
//   if (route.path.includes("product_")) {
//     className.value = "cardAllHidden";
//     closeBtn.value = "active";
//   } else {
//     className.value = "";
//     closeBtn.value = "";
//   }
// });
</script>
