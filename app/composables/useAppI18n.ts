/**
 * Composable for working with the i18n translation function.
 */
export function useAppI18n() {
  const { t } = useI18n()

  /**
   * Translate a key using the i18n translation function.
   * If the translation is not found, return the last part of the key.
   */
  const translate = (key: string, interpolate?: Record<string, any>) => {
    const translated = t(key, interpolate ?? {})

    if (translated === key) {
      return translated.split('.').pop() || translated
    }

    return translated
  }

  return {
    tt: translate,
  }
}
