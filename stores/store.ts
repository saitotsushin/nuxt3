export const useComponentStore = defineStore('componentStore', {
  state: () => ({
    title: '',
    cdPath: ''
  }),
  actions: {
    addComponent(title: string, cdPath: string) {
      console.log("addComponent");
      this.title = title;
      this.cdPath = cdPath;
    },
  },
})