import * as React from 'preact'

import * as S from './Switch.styles'

export const Switch = ({
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  value,
  inputRef,
  disabled,
  name
}) => {
  return (
    <S.SwitchWrapper aria-disabled={disabled}>
      <S.SwitchInput
        name={name}
        ref={inputRef}
        checked={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        type="checkbox"
      />

      <S.SimulatedSwitch className={value ? 'selected' : null} />
    </S.SwitchWrapper>
  )
}

Switch.propTypes = {
  onChange: Function,
  onKeyDown: Function,
  onFocus: Function,
  onBlur: Function,
  value: Boolean,
  checked: Boolean,
  inputRef: Object,
  disabled: Boolean,
  type: String,
  name: String
}
