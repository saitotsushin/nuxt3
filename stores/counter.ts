export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    name: '',
    mainColor: '',
    subColor: '',
  }),
  actions: {
    // ユーザー情報の更新
    setSiteDate(
      name: string,
      mainColor: string,
      subColor: string
    ) {
      this.name = name
      this.mainColor = mainColor
      this.subColor = subColor
    },
    setMainColor(
      mainColor: string
    ) {
      this.mainColor = mainColor
    }
  }
})