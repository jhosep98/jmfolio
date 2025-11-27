import { z } from 'zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const signupSchema = z
  .object({
    email: z.email('invalid_email'),
    password: z.string().min(8, 'invalid_password').regex(passwordRegex, 'invalid_password'),
    confirmPassword: z.string().min(1, 'required'),
    name: z.string().min(2, 'min_length').max(100, 'max_length').optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwords_not_match',
    path: ['confirmPassword'],
  })

export type SignupInput = z.infer<typeof signupSchema>
