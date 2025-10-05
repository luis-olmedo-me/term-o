import * as React from 'preact'
import * as S from './TextArea.styles'

export const TextArea = ({ onChange, onBlur, value, name, maxLines, disabled = false }) => {
  return (
    <S.TextAreaInput
      name={name}
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
      rows={maxLines}
      value={value}
      spellCheck="false"
    />
  )
}
TextArea.propTypes = {
  onChange: Function,
  onBlur: Function,
  value: Boolean,
  disabled: Boolean,
  maxLines: Number,
  name: String
}
