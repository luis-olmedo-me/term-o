import * as React from 'preact'

import * as S from './Input.styles'

export const Input = ({ onChange, onKeyDown, placeholder, value, prefix }) => {
  return (
    <S.InputWrapper>
      <span>{prefix}</span>

      <S.Input
        spellCheck="false"
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
    </S.InputWrapper>
  )
}
