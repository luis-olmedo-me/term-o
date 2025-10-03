import * as React from 'preact'

export const TextArea = ({ onChange, onBlur, value, name, disabled = false }) => {
  return (
    <textarea name={name} disabled={disabled} onBlur={onBlur} onChange={onChange}>
      {value}
    </textarea>
  )
}
TextArea.propTypes = {
  onChange: Function,
  onBlur: Function,
  value: Boolean,
  disabled: Boolean,
  name: String
}
