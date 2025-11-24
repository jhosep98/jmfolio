'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'

type SignupFormProps = React.ComponentProps<'div'> & {
  dict: {
    title: string
    description: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    passwordLabel: string
    confirmPasswordLabel: string
    passwordHint: string
    submitButton: string
    hasAccount: string
    signinLink: string
    validation: {
      nameMinLength: string
      emailInvalid: string
      passwordMinLength: string
      confirmPasswordMinLength: string
      passwordMismatch: string
    }
    successMessage: string
  }
}

const SignupForm: React.FC<SignupFormProps> = ({ className, dict, ...props }) => {
  const formSchema = z.object({
    name: z.string().min(3, dict.validation.nameMinLength),
    email: z.email(dict.validation.emailInvalid),
    password: z.string().min(8, dict.validation.passwordMinLength),
    confirmPassword: z.string().min(8, dict.validation.confirmPasswordMinLength),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.password !== data.confirmPassword) {
      toast.error(dict.validation.passwordMismatch)
      return
    }

    try {
      const res = await axios.post('/api/auth/signup', data)

      console.log(res)

      toast.success(dict.successMessage)
      form.reset()
    } catch (error) {
      console.log(error)
      toast.success('Something went worng!')
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>{dict.title}</CardTitle>

          <CardDescription>{dict.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form id='form-signup' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name='name'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='name'>{dict.nameLabel}</FieldLabel>

                    <Input
                      {...field}
                      id='name'
                      type='text'
                      placeholder={dict.namePlaceholder}
                      required
                      autoComplete='off'
                    />

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='email'>{dict.emailLabel}</FieldLabel>

                    <Input
                      {...field}
                      id='email'
                      type='email'
                      placeholder={dict.emailPlaceholder}
                      required
                      autoComplete='off'
                    />

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Field>
                <Field className='grid grid-cols-2 gap-4'>
                  <Controller
                    name='password'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <div className='flex items-center'>
                          <FieldLabel htmlFor='password'>{dict.passwordLabel}</FieldLabel>
                        </div>

                        <Input {...field} id='password' type='password' required />

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    name='confirmPassword'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='confirmPassword'>
                          {dict.confirmPasswordLabel}
                        </FieldLabel>

                        <Input {...field} id='confirmPassword' type='password' required />

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </Field>
                <FieldDescription>{dict.passwordHint}</FieldDescription>
              </Field>

              <Field>
                <Button type='submit' disabled={form.formState.isSubmitting}>
                  {dict.submitButton}
                </Button>

                <FieldDescription className='text-center'>
                  {dict.hasAccount} <Link href={ROUTES.SIGNIN}>{dict.signinLink}</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignupForm
