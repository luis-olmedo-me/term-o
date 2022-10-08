import * as React from 'react'
import { DatePicker, Wrapper } from './DateTimePickerAction.styles'

export const DateTimePickerAction = ({
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
