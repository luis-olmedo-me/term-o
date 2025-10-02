import * as React from 'preact'

import * as S from './Input.styles'

export const Input = ({
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  placeholder,
  value,
  checked,
  prefix,
  inputRef,
  disabled,
  type = 'text',
  postFix,
  name,
  variant
}) => {
  return (
    <S.InputWrapper aria-disabled={disabled}>
      {prefix && <S.Prefix>{prefix}</S.Prefix>}

      <S.Input
        ref={inputRef}
        name={name}
        spellCheck="false"
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={variant}
      />

      {postFix && <S.Postfix>{postFix}</S.Postfix>}
    </S.InputWrapper>
  )
}

Input.propTypes = {
  onChange: Function,
  onKeyDown: Function,
  onFocus: Function,
  onBlur: Function,
  placeholder: String,
  value: String,
  checked: Boolean,
  prefix: String,
  postFix: String,
  inputRef: Object,
  disabled: Boolean,
  type: String,
  name: String,
  variant: String
}
