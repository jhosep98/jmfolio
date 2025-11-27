import type { NextRequest } from 'next/server'

export const SUPPORTED_LOCALES = {
  'en-US': 'en-US',
  'es-ES': 'es-ES',
  'pt-BR': 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-BR',
} as const

export const DEFAULT_LOCALE = 'en-US'

export function detectLocale(request: NextRequest): string {
  const queryLang = request.nextUrl.searchParams.get('lang')

  if (queryLang) {
    return SUPPORTED_LOCALES[queryLang as keyof typeof SUPPORTED_LOCALES] || DEFAULT_LOCALE
  }

  const headerLang = request.headers.get('x-locale')

  if (headerLang) {
    return SUPPORTED_LOCALES[headerLang as keyof typeof SUPPORTED_LOCALES] || DEFAULT_LOCALE
  }

  const acceptLanguage = request.headers.get('accept-language')

  if (acceptLanguage) {
    const lang = acceptLanguage.split(',')[0].split(';')[0].trim()

    let detected = SUPPORTED_LOCALES[lang as keyof typeof SUPPORTED_LOCALES]

    if (!detected && lang.includes('-')) {
      const baseLang = lang.split('-')[0]

      detected = SUPPORTED_LOCALES[baseLang as keyof typeof SUPPORTED_LOCALES]
    }

    detected = detected || DEFAULT_LOCALE

    return detected
  }

  return DEFAULT_LOCALE
}
