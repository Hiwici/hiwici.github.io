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
})
