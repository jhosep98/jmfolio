import type { ZodError } from 'zod'
import type { Translator } from '@/lib/i18n/translator'

export function translateZodErrors(
  zodError: ZodError,
  translator: Translator,
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const err of zodError.issues) {
    const field = err.path.join('.') || 'general'
    const errorKey = err.message
    const translated = translator.t(`errors.validation.${errorKey}`)

    errors[field] = translated !== `errors.validation.${errorKey}` ? translated : errorKey
  }

  return errors
}
