import * as React from 'preact'
import { FakeInput } from './Switch.styles'

export const Switch = ({ checked, onChange }) => {
  return (
    <FakeInput
      className={checked ? 'checked' : ''}
      onClick={() => onChange({ checked: !checked })}
    />
  )
}
