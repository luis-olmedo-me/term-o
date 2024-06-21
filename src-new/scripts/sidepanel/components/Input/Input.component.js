import * as React from 'preact'

export const Input = ({ onChange, placeholder }) => {
  return <input type="text" onChange={onChange} placeholder={placeholder} />
}
