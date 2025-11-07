import prisma from '@/lib/prisma'
import type { User } from './generated/prisma/client'

export default async function Home() {
  const users: User[] = await prisma.user.findMany()

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold mb-8 font-(family-name:--font-geist-sans) text-[#333333]'>
        Superblog ({users.length})
      </h1>

      <ol className='list-decimal list-inside font-(family-name:--font-geist-sans)'>
        {users.map((user) => (
          <li key={user.id} className='mb-2'>
            {user.name}
          </li>
        ))}
      </ol>
    </div>
  )
}
