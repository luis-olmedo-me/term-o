import * as React from 'preact'

export const Input = ({ onChange, onKeyDown, placeholder, value }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  )
}
