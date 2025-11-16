import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { type NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { LOCALES } from './lib/constants'

const PROTECTED_ROUTES = ['/dashboard']

const AUTH_ROUTES = ['/auth/signin', '/auth/signup']

function getLocale(request: NextRequest): string {
  const headers = {
    'accept-language': request.headers.get('accept-language') || 'en-US',
  }
  const languages = new Negotiator({ headers }).languages()
  return match(languages, LOCALES, 'en-US')
}

function getPathnameWithoutLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname.startsWith(`/${locale}`)) {
      return pathname.slice(`/${locale}`.length) || '/'
    }
  }

  return pathname
}

function isProtectedRoute(pathname: string): boolean {
  const cleanPath = getPathnameWithoutLocale(pathname)

  return PROTECTED_ROUTES.some((route) => cleanPath.startsWith(route))
}

function isAuthRoute(pathname: string): boolean {
  const cleanPath = getPathnameWithoutLocale(pathname)

  return AUTH_ROUTES.some((route) => cleanPath.startsWith(route))
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  let locale: string
  if (pathnameHasLocale) {
    locale = pathname.split('/')[1]
  } else {
    locale = getLocale(request)
  }

  if (!isAuthRoute(pathname) && isProtectedRoute(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      const loginUrl = new URL(`/${locale}/auth/signin`, request.url)

      loginUrl.searchParams.set('callbackUrl', pathname)

      return NextResponse.redirect(loginUrl)
    }
  }

  if (isAuthRoute(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (token && (pathname.includes('/signin') || pathname.includes('/signup'))) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
    }
  }

  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/${locale}${pathname}`

    return NextResponse.redirect(request.nextUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
