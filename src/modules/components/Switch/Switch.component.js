import * as React from 'preact'
import { useRef } from 'preact/hooks'
import { Container, FakeInput, Input } from './Switch.styles'

export const Switch = ({ checked, onChange, className }) => {
  console.log('checked', checked)
  return (
    <Container className={className || ''}>
      <Input type="checkbox" checked={checked} onClick={() => onChange({ checked: !checked })} />

      <FakeInput className={checked ? 'checked' : ''} />
    </Container>
  )
}
