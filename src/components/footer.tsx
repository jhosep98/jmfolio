import Link from 'next/link'
import type * as React from 'react'
import { Logo } from '@/components/logo'
import { ROUTES } from '@/lib/constants'

interface FooterProps {
  text: string
}

const FooterSection: React.FC<FooterProps> = ({ text }) => (
  <footer className='py-16 md:py-32'>
    <div className='mx-auto max-w-5xl px-6'>
      <Link href={ROUTES.HOME} aria-label='go home' className='mx-auto block size-fit'>
        <Logo />
      </Link>

      <div className='my-4 flex flex-wrap justify-center gap-6 text-sm' />
      {/* <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
        <ModeToggle />
        <LangToggle />
      </div> */}
      <span className='text-muted-foreground block text-center text-sm'>
        {' '}
        © {new Date().getFullYear()} JMFolio, {text}
      </span>
    </div>
  </footer>
)

export default FooterSection
