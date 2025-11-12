import Link from 'next/link'
import type * as React from 'react'
import { Logo } from '@/components/logo'
import LangToggle from './lang-toggle'
import ModeToggle from './mode-toggle'

const links = [
  {
    title: 'Features',
    href: '#',
  },
  {
    title: 'Solution',
    href: '#',
  },
  {
    title: 'Customers',
    href: '#',
  },
  {
    title: 'Pricing',
    href: '#',
  },
  {
    title: 'Help',
    href: '#',
  },
  {
    title: 'About',
    href: '#',
  },
]

const FooterSection: React.FC = () => (
  <footer className='py-16 md:py-32'>
    <div className='mx-auto max-w-5xl px-6'>
      <Link href='/' aria-label='go home' className='mx-auto block size-fit'>
        <Logo />
      </Link>

      <div className='my-8 flex flex-wrap justify-center gap-6 text-sm'>
        {links.map((link, index) => (
          <Link
            key={`${link.title}-${index}`}
            href={link.href}
            className='text-muted-foreground hover:text-primary block duration-150'
          >
            <span>{link.title}</span>
          </Link>
        ))}
      </div>
      <div className='my-8 flex flex-wrap justify-center gap-6 text-sm'>
        <ModeToggle />
        <LangToggle />
      </div>
      <span className='text-muted-foreground block text-center text-sm'>
        {' '}
        © {new Date().getFullYear()} Tailark, All rights reserved
      </span>
    </div>
  </footer>
)

export default FooterSection
