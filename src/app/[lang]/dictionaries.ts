import 'server-only'

import type { Locale } from '@/types/types'

const dictionaries = {
  'en-US': () => import('./dictionaries/en.json').then((module) => module.default),
  'es-ES': () => import('./dictionaries/es.json').then((module) => module.default),
  'pt-BR': () => import('./dictionaries/pt.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  const dictionary = dictionaries[locale]

  if (!dictionary) {
    throw new Error(`Unsupported locale: ${locale}`)
  }
  return dictionary()
}
