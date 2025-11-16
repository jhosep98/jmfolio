import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
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
  }
}

const SignupForm: React.FC<SignupFormProps> = ({ className, dict, ...props }) => (
  <div className={cn('flex flex-col gap-6', className)} {...props}>
    <Card>
      <CardHeader className='text-center'>
        <CardTitle className='text-xl'>{dict.title}</CardTitle>

        <CardDescription>{dict.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>{dict.nameLabel}</FieldLabel>
              <Input id='name' type='text' placeholder={dict.namePlaceholder} required />
            </Field>
            <Field>
              <FieldLabel htmlFor='email'>{dict.emailLabel}</FieldLabel>
              <Input id='email' type='email' placeholder={dict.emailPlaceholder} required />
            </Field>
            <Field>
              <Field className='grid grid-cols-2 gap-4'>
                <Field>
                  <FieldLabel htmlFor='password'>{dict.passwordLabel}</FieldLabel>
                  <Input id='password' type='password' required />
                </Field>
                <Field>
                  <FieldLabel htmlFor='confirm-password'>{dict.confirmPasswordLabel}</FieldLabel>
                  <Input id='confirm-password' type='password' required />
                </Field>
              </Field>
              <FieldDescription>{dict.passwordHint}</FieldDescription>
            </Field>
            <Field>
              <Button type='submit'>{dict.submitButton}</Button>
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

export default SignupForm
