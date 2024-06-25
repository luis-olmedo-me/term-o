import * as React from 'preact'
import { useState } from 'preact/hooks'
import Input from '../Input'

export const Prompt = ({ onEnter, inputRef }) => {
  const [value, setValue] = useState('')

  const handleChange = event => {
    const value = event.target.value

    setValue(value)
  }

  const handleKeyDown = event => {
    const key = event.key

    if (key === 'Enter') {
      onEnter(value)
      setValue('')
    }
  }

  return <Input ref={inputRef} value={value} onChange={handleChange} onKeyDown={handleKeyDown} />
}
