import { GalleryVerticalEnd } from 'lucide-react'
import Link from 'next/link'
import SignupForm from '@/components/auth/signup-form'
import { ROUTES } from '@/lib/constants'
import type { Locale } from '@/types/types'
import { getDictionary } from '../../dictionaries'

export default async function SignUpPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link href={ROUTES.HOME} className='flex items-center gap-2 self-center font-medium'>
          <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          JMFolio
        </Link>
        <SignupForm dict={dict.auth.signup} />
      </div>
    </div>
  )
}
