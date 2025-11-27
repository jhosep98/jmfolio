import bcrypt from 'bcrypt'
import type { NextRequest } from 'next/server'
import { ApiResponse } from '@/lib/api/response'
import { validateRequest } from '@/lib/api/validate-request'
import { detectLocale } from '@/lib/i18n/detect-locale'
import { Translator } from '@/lib/i18n/translator'
import prisma from '@/lib/prisma'
import { signupSchema } from '@/lib/validations/auth'

const BCRYPT_ROUNDS = 12

export async function POST(request: NextRequest) {
  const locale = detectLocale(request)
  const t = new Translator(locale)
  const api = new ApiResponse(t)

  try {
    const result = await validateRequest(request, signupSchema, api, t)

    if (!result.success) return result.error

    const { email, password, name } = result.data

    const normalizedEmail = email.toLowerCase().trim()

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    })

    if (existingUser) {
      return api.error('errors.validation.email_exists', { statusCode: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS)

    const newUser = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: name?.trim() || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    const formattedUser = {
      ...newUser,
      createdAt: t.formatDate(newUser.createdAt, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    }

    return api.created(formattedUser, t.t('success.user_registered'))
  } catch {
    return api.serverError()
  }
}
