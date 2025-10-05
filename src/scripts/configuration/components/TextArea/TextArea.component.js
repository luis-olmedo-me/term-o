import * as React from 'preact'
import { useRef } from 'preact/hooks'
import * as S from './TextArea.styles'

export const TextArea = ({ onChange, onBlur, value, name, maxLines, disabled = false }) => {
  const inputRef = useRef(null)

  const handleChange = event => {
    var lines = inputRef.current.value.split('\n')

    if (lines.length > maxLines) {
      inputRef.current.value = lines.slice(0, maxLines).join('\n')
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
      rows={maxLines}
      value={value}
    ></S.TextAreaInput>
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
