import FeaturesSection from '@/components/features-section'
import FooterSection from '@/components/footer'
import HeroSection from '@/components/hero-section'
import type { Locale } from '@/types/types'
import { getDictionary } from './dictionaries'

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <HeroSection dict={dict.landing.hero} />
      <FeaturesSection dict={dict.landing.features} />
      <FooterSection text={dict.footer.text} />
    </>
  )
}
