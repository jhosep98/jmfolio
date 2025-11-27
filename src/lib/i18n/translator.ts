import enUS from './locales/en-US.json'
import esES from './locales/es-ES.json'
import ptBR from './locales/pt-BR.json'

type Translations = typeof enUS

type TranslationKey = string

const translations: Record<string, Translations> = {
  'en-US': enUS,
  'es-ES': esES,
  'pt-BR': ptBR,
}

export class Translator {
  private locale: string
  private translations: Translations

  constructor(locale: string) {
    this.locale = locale
    this.translations = translations[locale] || translations['en-US']
  }

  /**
   * Translate a key with variable interpolation
   * @example t('errors.validation.required', { field: 'email' })
   */
  t(key: TranslationKey, params?: Record<string, string | number>): string {
    const keys = key.split('.')

    // biome-ignore lint/suspicious/noExplicitAny: <>
    let value: any = this.translations

    for (const k of keys) {
      if (typeof value !== 'object' || value === null) {
        value = undefined
        break
      }
      value = value[k]
    }

    if (typeof value !== 'string') {
      console.warn(`Missing translation for key: ${key} (locale: ${this.locale})`)
      return key
    }

    if (params) {
      return Object.entries(params).reduce(
        (text, [param, val]) => text.replace(`{${param}}`, String(val)),
        value,
      )
    }

    return value
  }

  formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.locale, options).format(value)
  }

  formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date

    return new Intl.DateTimeFormat(this.locale, options).format(dateObj)
  }

  formatCurrency(value: number, currency = 'USD'): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency,
    }).format(value)
  }
}
