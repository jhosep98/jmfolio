import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { validateEmail, validatePassword } from '@/lib/utils'

const BCRYPT_ROUNDS = 12

interface SignupRequest {
  email: string
  password: string
  confirmPassword: string
  name?: string
}

export async function POST(req: Request) {
  try {
    let data: SignupRequest

    try {
      data = await req.json()
    } catch {
      return Response.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    const { email, password, confirmPassword, name } = data

    if (!email || !password || !confirmPassword) {
      return Response.json(
        { error: 'Email, password, and confirm-password are required' },
        { status: 400 },
      )
    }

    if (!validateEmail(email)) {
      return Response.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return Response.json({ error: 'Passwords do not match' }, { status: 400 })
    }

    const passwordValidation = validatePassword(password)

    if (!passwordValidation.valid) {
      return Response.json({ error: passwordValidation.error }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })

    if (existingUser) {
      return Response.json({ error: 'Email already registered' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ...(name && { name }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    return Response.json(
      {
        message: 'User created successfully',
        user: newUser,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Signup error:', error)

    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
