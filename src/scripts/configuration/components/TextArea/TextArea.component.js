import * as React from 'preact'
import * as S from './TextArea.styles'

export const TextArea = ({ onChange, onBlur, value, name, disabled = false }) => {
  return (
    <S.TextAreaInput
      name={name}
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
      spellCheck="false"
      className="vertical-scroller"
      rows={6}
    >
      {value}
    </S.TextAreaInput>
  )
}
TextArea.propTypes = {
  onChange: Function,
  onBlur: Function,
  value: Boolean,
  disabled: Boolean,
  name: String
}
