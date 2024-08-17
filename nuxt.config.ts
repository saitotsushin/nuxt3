// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  app: {
    baseURL: '/nuxt3/',
    cdnURL: '/nuxt3/',
    buildAssetsDir: "",
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
      	  // TODO: ここに先ほど控えたhrefの中身を記載
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap",
          crossorigin: "",
        },
      ],
    },
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "~/assets/styles/main.scss"
  ],
  build: {
    transpile: ["vuetify"]
  }
})