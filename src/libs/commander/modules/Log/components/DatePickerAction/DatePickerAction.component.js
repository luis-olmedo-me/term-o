import * as React from 'react'
import { DatePicker, Trigger, Wrapper } from './DatePickerAction.styles'

export const DatePickerAction = ({
  className,
  value,
  disabled,
  onChange,
  label
}) => {
  return (
    <Wrapper className={className}>
      <span>{label}</span>

      <DatePicker
        type='datetime-local'
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
    </Wrapper>
  )
}
