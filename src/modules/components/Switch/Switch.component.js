import * as React from 'preact'
import { Container, FakeInput, Input } from './Switch.styles'

export const Switch = ({ checked, onChange, className }) => {
  return (
    <Container className={className || ''}>
      <Input type="checkbox" checked={checked} onChange={onChange} />

      <FakeInput />
    </Container>
  )
}
