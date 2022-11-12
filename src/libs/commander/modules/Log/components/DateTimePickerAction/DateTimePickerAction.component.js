import * as React from 'preact'
import { DatePicker, Label, Wrapper } from './DateTimePickerAction.styles'

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
      <Label>{label}</Label>

      <DatePicker
        type='datetime-local'
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
    </Wrapper>
  )
}
