/**
 * A Pinia store for managing the locale state of the application.
 *
 * @store useLocaleStore
 */
export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: 'en' as LocaleCode,
  }),
  getters: {
    getLocale: (state) => state.locale,
  },
  actions: {
    /**
     * Initializes the locale of the application. This should be called on app startup
     */
    init() {
      this.loadLocale()
    },

    /**
     * Loads the locale from cookies or defaults to 'en' if no cookie is set.
     */
    loadLocale() {
      const savedLocale = useCookie('hiwici.github.io-locale').value
      this.locale = (savedLocale as LocaleCode) || 'en'
    },

    /**
     * Sets the locale and saves it to cookies.
     */
    setLocale(locale: LocaleCode) {
      const { $i18n } = useNuxtApp()

      this.locale = locale
      $i18n.setLocale(locale)
      useCookie('hiwici.github.io-locale').value = locale
    },

    /**
     * Gets the available locale options for the application.
     */
    options(): Option[] {
      return [
        { key: 'locale-en', label: 'English', value: 'en' },
        { key: 'locale-zh-Hant', label: '繁體中文', value: 'zh-Hant' },
      ]
    },
  },
})
