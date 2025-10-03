import * as React from 'preact'
import { useRef } from 'preact/hooks'
import * as S from './TextArea.styles'

export const TextArea = ({ onChange, onBlur, value, name, disabled = false }) => {
  const inputRef = useRef(null)

  const handleChange = event => {
    var lines = inputRef.current.value.split('\n')

    if (lines.length > 6) {
      inputRef.current.value = lines.slice(0, 6).join('\n')
    } else {
      onChange(event)
    }
  }

  return (
    <S.TextAreaInput
      ref={inputRef}
      name={name}
      disabled={disabled}
      onBlur={onBlur}
      onChange={handleChange}
      spellCheck="false"
      className="vertical-scroller"
      rows={6}
      value={value}
    ></S.TextAreaInput>
  )
}
TextArea.propTypes = {
  onChange: Function,
  onBlur: Function,
  value: Boolean,
  disabled: Boolean,
  name: String
}
