// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  app: {
    baseURL: '/nuxt3/',
    cdnURL: '/nuxt3/',
    buildAssetsDir: "",
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "~/assets/styles/main.scss"
  ],
  build: {
    transpile: ["vuetify"]
  }
})
