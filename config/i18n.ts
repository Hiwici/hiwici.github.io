import type { NuxtI18nOptions } from '@nuxtjs/i18n'

/**
 * i18n configuration
 *
 * @see https://i18n.nuxtjs.org/docs/getting-started
 */
const i18n = {
  strategy: 'no_prefix',
  defaultLocale: 'en',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'hiwici.github.io-locale',
    redirectOn: 'root',
  },
  locales: [
    { code: 'en', name: 'English', file: 'en.json' },
    { code: 'zh-Hant', name: '繁體中文', file: 'zh-Hant.json' },
  ],
  lazy: true,
} as NuxtI18nOptions

export default i18n
