import { NextResponse } from 'next/server'
import type { Translator } from '../i18n/translator'

interface ApiErrorOptions {
  statusCode?: number
  details?: unknown
}

export class ApiResponse {
  constructor(private translator: Translator) {}

  success<T>(data: T, message?: string) {
    return NextResponse.json(
      {
        success: true,
        message: message || this.translator.t('success.created'),
        data,
      },
      { status: 200 },
    )
  }

  created<T>(data: T, message?: string) {
    return NextResponse.json(
      {
        success: true,
        message: message || this.translator.t('success.created'),
        data,
      },
      { status: 201 },
    )
  }

  error(messageKey: string, options: ApiErrorOptions = {}) {
    const { statusCode = 400, details } = options

    return NextResponse.json(
      {
        success: false,
        message: this.translator.t(messageKey),
        ...(details ? { details } : {}),
      },
      { status: statusCode },
    )
  }

  validationError(errors: Record<string, string>) {
    return NextResponse.json(
      {
        success: false,
        message: this.translator.t('errors.validation.failed'),
        errors,
      },
      { status: 422 },
    )
  }

  unauthorized(messageKey = 'errors.auth.unauthorized') {
    return NextResponse.json(
      {
        success: false,
        message: this.translator.t(messageKey),
      },
      { status: 401 },
    )
  }

  notFound(messageKey = 'errors.common.not_found') {
    return NextResponse.json(
      {
        success: false,
        message: this.translator.t(messageKey),
      },
      { status: 404 },
    )
  }

  serverError(messageKey = 'errors.common.server_error') {
    return NextResponse.json(
      {
        success: false,
        message: this.translator.t(messageKey),
      },
      { status: 500 },
    )
  }
}
