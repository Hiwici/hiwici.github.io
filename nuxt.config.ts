import tailwindcss from '@tailwindcss/vite'
import i18n from './config/i18n'

const statsShimPath = new URL('./app/shims/stats-shim.ts', import.meta.url).pathname

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  // https://nuxt.com/docs/4.x/guide/concepts/auto-imports#auto-imported-components
  components: {
    dirs: [],
  },

  vite: {
    resolve: {
      alias: {
        'stats.js': statsShimPath,
      },
    },
    plugins: [tailwindcss()],
  },

  // Pre-renders the site into static HTML/CSS/JS
  nitro: {
    preset: 'github-pages',
  },

  app: {
    // Hosted at the root, so baseURL stays '/'
    baseURL: '/',
  },

  modules: ['@tresjs/nuxt', '@pinia/nuxt', '@nuxtjs/i18n'],

  // https://i18n.nuxtjs.org/docs/getting-started
  i18n: i18n,

  build: {
    transpile: ['@tresjs/cientos'],
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('tres-'),
      // isCustomElement: tag => tag.startsWith('Tres') || tag.startsWith('The')
    },
  },

  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'https://hiwici.github.io',
    },
  },
})
