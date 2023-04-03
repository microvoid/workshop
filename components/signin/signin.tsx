import React, { useRef, useState } from 'react'
import { Modal, Input, Row, Checkbox, Button, Text, Container, Spacer } from '@nextui-org/react'
import { Mail, Lock } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SiteConstant } from '@/common'

type SigninModal = {
  open: boolean
  defaultAction: 'signin' | 'signup'
  preventClose?: boolean
  onOpenChange?: (open: boolean) => void
}

export const SigninModal: React.FC<SigninModal> = ({ defaultAction, open, preventClose, onOpenChange }) => {
  const [action, setAction] = useState(defaultAction || 'signin')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const inputRef = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    repassword: useRef<HTMLInputElement>(null),
  }

  const closeHandler = () => {
    onOpenChange?.(false)
  }

  const onSubmit = () => {
    const email = inputRef.email.current?.value
    const password = inputRef.password.current?.value
    const repassword = inputRef.repassword.current?.value

    if (action === 'signin') {
      onSignin(email!, password!)
    }

    if (action === 'signup') {
      onSignup(email!, password!)
    }
  }

  const onSignin = (email: string, password: string) => {
    signIn('credentials', {
      redirect: false,
      email,
      password,
      // @ts-ignore
    }).then(({ ok, error }) => {
      setLoading(false)
      if (ok) {
        router.push('/dashboard')
      } else {
        toast.error(error)
      }
    })
  }
  const onSignup = (email: string, password: string) => {
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(async res => {
      setLoading(false)

      if (res.status === 200) {
        toast.success('Account created! Redirecting to login...')

        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        toast.error(await res.text())
      }
    })
  }

  return (
    <Modal
      blur
      preventClose={preventClose}
      closeButton={!preventClose}
      aria-labelledby="login-model"
      open={open}
      onClose={closeHandler}
      className="cursor-default"
    >
      <Modal.Header>
        <Text size={18}>
          Welcome to{' '}
          <Text b size={18}>
            {SiteConstant.name}
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Container gap={0}>
          <Button style={{ width: '100%' }} bordered color="gradient">
            Github
          </Button>
        </Container>

        <Container gap={0}>
          <Button style={{ width: '100%' }} bordered color="gradient">
            Google
          </Button>
        </Container>

        <Spacer y={1} />

        {action === 'signin' && <Text b>Sign in</Text>}
        {action === 'signup' && <Text b>Create an account</Text>}

        <Input
          ref={inputRef.email}
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          contentLeft={<Mail />}
        />

        <Input.Password
          ref={inputRef.password}
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          contentLeft={<Lock />}
        />

        {action === 'signup' && (
          <Input.Password
            ref={inputRef.repassword}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Repassword"
            contentLeft={<Lock />}
          />
        )}

        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          {/* <Text size={14}>Forgot password?</Text> */}
        </Row>

        <Row justify="space-between">
          {action === 'signin' && (
            <Text size={14}>
              Don't have an account?{' '}
              <strong onClick={() => setAction('signup')} className="cursor-pointer">
                Sign up
              </strong>{' '}
              for free.
            </Text>
          )}

          {action === 'signup' && (
            <Text size={14}>
              Already have an account?{' '}
              <strong onClick={() => setAction('signin')} className="cursor-pointer">
                Sign in
              </strong>{' '}
              instead.?
            </Text>
          )}
        </Row>

        <Toaster />
      </Modal.Body>
      <Modal.Footer>
        {!preventClose && (
          <Button auto flat color="error" bordered onPress={closeHandler}>
            Close
          </Button>
        )}

        <Button auto onPress={onSubmit}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
