import React from 'react'
import { Modal, Input, Row, Checkbox, Button, Text, Container, Spacer } from '@nextui-org/react'
import { Mail, Lock } from 'lucide-react'
import { SiteConstant } from '@/common'

type SigninModal = {
  open: boolean
  preventClose?: boolean
  onOpenChange?: (open: boolean) => void
}

export const SigninModal: React.FC<SigninModal> = ({ open, onOpenChange, preventClose }) => {
  const closeHandler = () => {
    onOpenChange?.(false)
  }

  return (
    <Modal
      blur
      preventClose={preventClose}
      closeButton={!preventClose}
      aria-labelledby="login-model"
      open={open}
      onClose={closeHandler}
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

        <Text>Email</Text>
        <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Email" contentLeft={<Mail />} />
        <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Password" contentLeft={<Lock />} />
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          {/* <Text size={14}>Forgot password?</Text> */}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        {!preventClose && (
          <Button auto flat color="error" bordered onPress={closeHandler}>
            Close
          </Button>
        )}

        <Button auto onPress={closeHandler}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
