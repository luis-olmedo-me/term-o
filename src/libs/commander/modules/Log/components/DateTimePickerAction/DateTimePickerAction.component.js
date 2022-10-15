import * as React from 'react'
import { DatePicker, Wrapper } from './DateTimePickerAction.styles'

export const DateTimePickerAction = ({
  className,
  value,
  disabled,
  onChange,
  label,
  title
}) => {
  return (
    <Wrapper className={className} title={title}>
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
