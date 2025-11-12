import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import AppProvider from '@/providers/app-provider'
import type { Locale } from '@/types/types'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'JM Folio',
  description: 'A simple portfolio tracker app built with Next.js, Prisma, and Tailwind CSS.',
}

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'es-ES' }, { lang: 'pt-BR' }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
