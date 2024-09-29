export const useComponentStore = defineStore('componentStore', {
  state: () => ({
    components: [
      { id: 1, content: 'Original Component Content' }
    ],
  }),
  actions: {
    addComponent(newComponent: { id: number, content: string }) {
      this.components.push(newComponent)
    },
  },
})