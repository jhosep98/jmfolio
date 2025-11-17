'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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

type LoginFormProps = React.ComponentProps<'div'> & {
  dict: {
    title: string
    description: string
    emailLabel: string
    emailPlaceholder: string
    passwordLabel: string
    submitButton: string
    noAccount: string
    signupLink: string
    validation: {
      emailInvalid: string
      passwordMinLength: string
    }
    successMessage: string
  }
}

const LoginForm: React.FC<LoginFormProps> = ({ className, dict, ...props }) => {
  const formSchema = z.object({
    email: z.email(dict.validation.emailInvalid),
    password: z.string().min(8, dict.validation.passwordMinLength),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(_data: z.infer<typeof formSchema>) {
    toast.success(dict.successMessage)

    form.reset()
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>{dict.title}</CardTitle>
          <CardDescription>{dict.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form id='form-login' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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

              <Field>
                <Button type='submit' disabled={form.formState.isSubmitting}>
                  {dict.submitButton}
                </Button>

                <FieldDescription className='text-center'>
                  {dict.noAccount} <Link href={ROUTES.SIGNUP}>{dict.signupLink}</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
