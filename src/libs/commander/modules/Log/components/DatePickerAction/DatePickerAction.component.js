import * as React from 'react'
import { DatePicker, Trigger, Wrapper } from './DatePickerAction.styles'

export const DatePickerAction = ({ className, value, disabled, onChange }) => {
  return (
    <Wrapper>
      <Trigger>📅 {value}</Trigger>

      <DatePicker
        type='date'
        className={className}
        disabled={disabled}
        onChange={onChange}
      />
    </Wrapper>
  )
}
