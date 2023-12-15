<template>
  <NuxtLoadingIndicator>
    <slot><Loading /></slot>
  </NuxtLoadingIndicator>
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
      <div class="containerInner">
        <div class="MainHeader draggable" @mousedown="startDrag">
          <img src="~/assets/images/player.png" alt="Discover Nuxt 3" />
        </div>
        <div class="Main">
          <div class="MainColumHeader draggable" @mousedown="startDrag">{{ MainColumHeader }}</div>
          <div class="MainColumn" ref="MainColumn" :style="{overflowX: MainColumnInfo.overflowX}">
            <div class="Column" ref="Column1" >
              Column
              <ul>
                <ColumnItem v-for="item in items"
                  :dirName = "item.dirName"
                  :columnList = "item.columnList"
                  :contentsList = "item.contents"
                  :dirNumber = "item.dirNumber"
                  @item-clicked="handleItemClick"
                />
              </ul>
            </div>
            <div class="Column" ref="Column2" v-if="MyColumnList.column2">
              <ul>
                <ColumnItem v-for="item in items2"
                  :dirName = "item.dirName"
                  :columnList = "item.columnList"
                  :contentsList = "item.contents"
                  :dirNumber = "item.dirNumber"
                  @item-clicked="handleItemClick"
                />
              </ul>
            </div>
            <div class="Column" ref="Column3" v-if="MyColumnList.column3">
              <ul>
                <ColumnItem v-for="item in items3"
                  :dirName = "item.dirName"
                  :columnList = "item.columnList"
                  :contentsList = "item.contents"
                  :dirNumber = "item.dirNumber"
                  @item-clicked="handleItemClick"
                />
              </ul>
            </div>
            <div class="Column" ref="Column4">
              Detail
            </div>
          </div>
          <slot />
        </div>
      </div>
      <div class="rightBar" @mousedown="startResizeX"><span></span></div>
      <div class="bottomBar" @mousedown="startResizeY"><span></span></div>
      <div class="resizeXYbar" @mousedown="startResizeXY"></div>
    </div>
    <PopupWindow
      :contentsList = "popuWindow.contents"
      :title = "popuWindow.title"
      @popup-clicked="handlePopupCloseClick"
    />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.container{
  /* 何かしらstyleがないとエラーになる... */
}
</style>

<script setup>
const MainColumHeader = ref("/");
const items = ref([
  {
    dirName: 'HOME',
    dirNumber: 1
  },
  {
    dirName: 'PROFILE',
    dirNumber: 1,
    contents: '<img src="/nuxt3/images/product/images.jpg"/><p>テスト</p><img src="/nuxt3/images/product/images.jpg"/>'
  },
  {
    dirName: 'PRODUCT',
    dirNumber: 1,
    columnList: [
      {
        dirName: "TEST1",
        dirNumber: 2,
        contents: '<img src="/nuxt3/images/product/images2.jpg"/><p>テスト</p><img src="/nuxt3/images/product/images2.jpg"/>'
      },
      {
        dirName: "TEST2",
        dirNumber: 2,
        contents: '<img src="/nuxt3/images/product/images3.jpg"/><p>テスト</p><img src="/nuxt3/images/product/images3.jpg"/>'
      }
    ]
  },
  {
    dirName: 'PHOTOS',
    dirNumber: 1, 
    columnList: [
      {
        dirName: "PHOTOS_1",
        dirNumber: 2,
        contents: '<img src="/nuxt3/images/product/10-6--thumb.png"/><p>テスト</p><img src="/nuxt3/images/product/10-6--thumb.png"/>'
      },
      {
        dirName: 'PHOTOS_2',
        dirNumber: 2,
        columnList: [
          {
            dirName: "PHOTOS_2_1",
            dirNumber: 3,
            contents: '<img src="/nuxt3/images/product/images4.jpg"/><p>テスト</p><img src="/nuxt3/images/product/images4.jpg"/>'
          },
          {
            dirName: "PHOTOS_2_2",
            dirNumber: 3,
            contents: '<img src="/nuxt3/images/product/images5.jpg"/><p>テスト</p><img src="/nuxt3/images/product/images5.jpg"/>'
          },
          {
            dirName: "PHOTOS_2_3",
            dirNumber: 3,
            contents: '<img src="/nuxt3/images/product/images6.jpg"/><p>テスト</p><img src="/nuxt3/images/product/images6.jpg"/>'
          },          
        ]
      },
      {
        dirName: 'PHOTOS_3',
        dirNumber: 2,
        columnList: [
        {
            dirName: "PHOTOS_3_1",
            dirNumber: 3,
            contents: '<img src="/nuxt3/images/product/images7.jpg"/><p>テスト</p><img src="/nuxt3/images/product/images7.jpg"/>'
          },
          {
            dirName: "PHOTOS_3_2",
            dirNumber: 3,
            contents: '<img src="/nuxt3/images/product/images8.jpg"/><p>テスト</p><img src="/nuxt3/images/product/images8.jpg"/>'
          } 
        ]
      }
    ]
  }
]);

const items2 = ref([]);
const items3 = ref([]);
const popuWindow = ref({title: "", contents:""});

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

const Column1 = ref(null);
const Column2 = ref(null);
const Column3 = ref(null);
const Column4 = ref(null);
const MainColumn = ref(null);
const MainColumnInfo = ref({
  overflowX: "auto",
});
const MyColumnList = ref({
  column1: true,
  column2: false,
  column3: false,
});

onMounted(() => {
  // マウント後にDOMの位置を取得
  const element = MyContainer.value;
  dragInfo.value.top = element.offsetTop;
  dragInfo.value.left = element.offsetLeft;
  resizableInfo.value.position = "absolute";
  resizableInfo.value.margin = "0";
});

watch(() => MyColumnList.value.column3, (newValue, oldValue) => {
  const element = MainColumn.value;
  const childColumn = Column1.value;
  nextTick(() => {
      element.scrollTo({
        left: childColumn.offsetWidth,
        behavior: 'smooth' // 'smooth'を指定するとスムーズなアニメーションでスクロールします
      });
    MainColumnInfo.value.overflowX = "scroll";
    });

  // ここでmyValue1に対する処理を実行
});
const handleItemClick = (itemInfo) => {
  console.log("itemInfo.dirNumber=" + itemInfo.dirNumber);
  MainColumHeader.value = itemInfo.dirName;
  if (itemInfo.columnList) {
    if (itemInfo.dirNumber == 1) {
      MyColumnList.value.column2 = true;
      MyColumnList.value.column3 = false;
      items2.value = [];
      items3.value = [];
      const reactiveItems2 = reactive(itemInfo.columnList);
      items2.value = reactiveItems2;
    }
    if (itemInfo.dirNumber == 2) {
      MyColumnList.value.column3 = true;
      const reactiveItems3 = reactive(itemInfo.columnList);
      items3.value = reactiveItems3;
      MainColumnInfo.value.overflowX = "scroll";
      
    }    
  } else {
    if (itemInfo.dirNumber == 1) {
      items2.value = [];
      items3.value = [];      
      MyColumnList.value.column2 = false;
      MyColumnList.value.column3 = false;
    }
    if (itemInfo.dirNumber == 2) {
      console.log("columnListなし");
      items3.value = [];      
      MyColumnList.value.column3 = false;
    }
    // const reactiveItemsDetail = itemInfo.contents;
    popuWindow.value.title = itemInfo.dirName;  
    popuWindow.value.contents = itemInfo.contents;  
    MainColumnInfo.value.overflowX = "auto";  
  }
}
const emit = defineEmits(['change', 'delete']);//<-必須
const handlePopupCloseClick = (_data) => {
  popuWindow.value.contents = '';  
}
</script>
