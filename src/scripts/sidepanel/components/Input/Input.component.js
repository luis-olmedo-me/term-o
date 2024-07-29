import * as React from 'preact'

import * as S from './Input.styles'

export const Input = ({
  onChange,
  onKeyDown,
  onBlur,
  placeholder,
  value,
  prefix,
  inputRef,
  disabled,
  type = 'text'
}) => {
  return (
    <S.InputWrapper aria-disabled={disabled}>
      {prefix && <S.Prefix>{prefix}</S.Prefix>}

      <S.Input
        ref={inputRef}
        spellCheck="false"
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
      />
    </S.InputWrapper>
  )
}

Input.propTypes = {
  onChange: Function,
  onKeyDown: Function,
  onBlur: Function,
  placeholder: String,
  value: String,
  prefix: String,
  inputRef: Object,
  disabled: Boolean,
  type: String
}
