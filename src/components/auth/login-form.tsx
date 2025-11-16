import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
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
  }
}

const LoginForm: React.FC<LoginFormProps> = ({ className, dict, ...props }) => (
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
              <FieldLabel htmlFor='email'>{dict.emailLabel}</FieldLabel>
              <Input id='email' type='email' placeholder={dict.emailPlaceholder} required />
            </Field>

            <Field>
              <div className='flex items-center'>
                <FieldLabel htmlFor='password'>{dict.passwordLabel}</FieldLabel>
              </div>
              <Input id='password' type='password' required />
            </Field>

            <Field>
              <Button type='submit'>{dict.submitButton}</Button>
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

export default LoginForm
