import * as React from 'preact'

import * as S from './Input.styles'

export const Input = ({ onChange, onKeyDown, placeholder, value, prefix, inputRef, disabled }) => {
  return (
    <S.InputWrapper aria-disabled={disabled}>
      <S.Prefix>{prefix}</S.Prefix>

      <S.Input
        ref={inputRef}
        spellCheck="false"
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
      />
    </S.InputWrapper>
  )
}

Input.propTypes = {
  onChange: Function,
  onKeyDown: Function,
  placeholder: String,
  value: String,
  prefix: String,
  inputRef: Object,
  disabled: Boolean
}
