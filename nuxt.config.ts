import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['@tresjs/nuxt', '@pinia/nuxt'],

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('tres-'),
      // isCustomElement: tag => tag.startsWith('Tres') || tag.startsWith('The')
    }
  }
})
