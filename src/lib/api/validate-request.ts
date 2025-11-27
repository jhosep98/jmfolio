import type { NextRequest } from 'next/server'
import type { ZodType } from 'zod'
import type { Translator } from '../i18n/translator'
import { translateZodErrors } from '../validations/zod-translator'
import type { ApiResponse } from './response'

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: ReturnType<ApiResponse['error'] | ApiResponse['validationError']> }

export async function validateRequest<T>(
  request: NextRequest,
  schema: ZodType<T>,
  api: ApiResponse,
  t: Translator,
): Promise<ValidationResult<T>> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return {
      success: false,
      error: api.error('errors.common.invalid_json', { statusCode: 400 }),
    }
  }

  const validation = schema.safeParse(body)

  if (!validation.success) {
    const errors = translateZodErrors(validation.error, t)
    return {
      success: false,
      error: api.validationError(errors),
    }
  }

  return {
    success: true,
    data: validation.data,
  }
}
