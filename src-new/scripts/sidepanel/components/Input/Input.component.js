import * as React from 'preact'

import { StyledInput } from './Input.styles'

export const Input = ({ onChange, onKeyDown, placeholder, value }) => {
  return (
    <StyledInput
      spellCheck="false"
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  )
}
