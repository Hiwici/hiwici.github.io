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
    { code: 'zh-Hans', name: '简体中文', file: 'zh-Hans.json' },
    // { code: 'zh-Hant', name: '繁體中文', file: 'zh-Hant.json' },
  ],
  lazy: true,
}

export default i18n
