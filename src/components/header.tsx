'use client'

import Link from 'next/link'
import * as React from 'react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const HeroHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <nav className='fixed z-20 w-full px-2'>
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled && 'bg-background/50 rounded-2xl border backdrop-blur-lg lg:px-5',
          )}
        >
          <div className='relative flex flex-wrap items-center justify-between gap-6 py-3'>
            <div className='flex w-full justify-between'>
              <Link href={ROUTES.HOME} aria-label='go home' className='flex items-center space-x-2'>
                <Logo />
              </Link>

              <div className='flex items-center space-x-2'>
                <Button asChild variant='outline' size='sm'>
                  <Link href={ROUTES.SIGNIN}>
                    <span>Login</span>
                  </Link>
                </Button>

                <Button asChild size='sm'>
                  <Link href={ROUTES.SIGNUP}>
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeroHeader
