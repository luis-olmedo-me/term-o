import * as React from 'react'
import { DatePicker, Trigger, Wrapper } from './DatePickerAction.styles'

export const DatePickerAction = ({ className, value, disabled, onChange }) => {
  return (
    <Wrapper className={className}>
      <Trigger>📅 {value}</Trigger>

      <DatePicker type='date' disabled={disabled} onChange={onChange} />
    </Wrapper>
  )
}
