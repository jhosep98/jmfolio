// import prisma from '@/lib/prisma'
// import type { User } from './generated/prisma/client'

import Counter from '@/components/counter'
import FooterSection from '@/components/footer'
import HeroSection from '@/components/hero-section'
import type { Locale } from '@/types/types'
import { getDictionary } from './dictionaries'

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  // const users: User[] = await prisma.user.findMany()
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <HeroSection />

      <p>{dict.products.cart}</p>
      <Counter />

      <FooterSection />
    </>
  )
}
