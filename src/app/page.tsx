// import prisma from '@/lib/prisma'
// import type { User } from './generated/prisma/client'
import HeroSection from '@/components/hero-section'

export default async function Home() {
  // const users: User[] = await prisma.user.findMany()

  return <HeroSection />
}
