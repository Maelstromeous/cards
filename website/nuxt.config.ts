// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',

  modules: ['@nuxt/ui', '@nuxt/eslint', '@vueuse/nuxt'],

  css: ['~/assets/css/main.css'],

  // Dark by default; the header toggle still switches to light and remembers it.
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  app: {
    head: {
      titleTemplate: '%s - Humanity Deck',
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // Override at runtime with NUXT_PUBLIC_API_BASE and NUXT_PUBLIC_SITE_URL.
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001',
      siteUrl: 'http://localhost:3000',
    },
  },

  devtools: { enabled: true },
})
