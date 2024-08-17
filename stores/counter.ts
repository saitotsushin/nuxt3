export const useWebsiteStore = defineStore('websiteStore', {
    state: () => ({
      name: 'TEST',
      color: ''
    }),
    actions: {
        // ユーザー情報の更新
        setSiteDate (name: string, color: string) {
            this.name = name
            this.color = color
        }
    }
  })