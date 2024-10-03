export const useComponentStore = defineStore('componentStore', {
  state: () => ({
    title: '',
    cdPath: '',
    modelIndex: 0,
    showModelIndex: 0,
    firstMounted: false
  }),
  actions: {
    addComponent(title: string, cdPath: string, modelIndex: number) {
      console.log("this.cdPath",this.cdPath)
      this.title = title;
      this.cdPath = cdPath;
      this.modelIndex = modelIndex;
    },
    showPage(showModelIndex: number) {
      this.showModelIndex = showModelIndex;    
      this.firstMounted = true;
    }
  },
})