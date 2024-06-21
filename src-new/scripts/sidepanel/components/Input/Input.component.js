import * as React from 'preact'

import * as S from './Input.styles'

export const Input = ({ onChange, onKeyDown, placeholder, value, prefix, inputRef }) => {
  return (
    <S.InputWrapper>
      <span>{prefix}</span>

      <S.Input
        ref={inputRef}
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
