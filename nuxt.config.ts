import tailwindcss from '@tailwindcss/vite'

const statsShimPath = new URL('./app/shims/stats-shim.ts', import.meta.url).pathname

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    resolve: {
      alias: {
        'stats.js': statsShimPath,
      },
    },
    plugins: [tailwindcss()],
  },

  modules: ['@tresjs/nuxt', '@pinia/nuxt'],

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
