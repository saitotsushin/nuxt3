export const useWebsiteStore = defineStore('websiteStore', {
    state: () => ({
      name: 'TEST',
      description: ''
    }),
    actions: {
        // ユーザー情報の更新
        setSiteDate (name: string, description: string) {
            this.name = name
            this.description = description
        }
    }
  })