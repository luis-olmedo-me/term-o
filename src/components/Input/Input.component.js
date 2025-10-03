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
  type,
  postFix,
  name,
  variant,
  fullWidth,
  errorMessage = null
}) => {
  return (
    <>
      <S.InputWrapper
        aria-disabled={disabled}
        aria-error={typeof errorMessage === 'string'}
        aria-fit-content={!fullWidth}
      >
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

      {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
    </>
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
  variant: String,
  errorMessage: String,
  fullWidth: Boolean
}
