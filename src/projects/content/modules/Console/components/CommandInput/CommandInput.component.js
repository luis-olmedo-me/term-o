import React, { useState } from 'react'
import { Hash, Input, InputWrapper } from './CommandInput.styles'

export const CommandInput = ({ inputReference, handleOnEnter }) => {
  const [command, setCommand] = useState('')

  const handleCommandChange = ({ target: { value: newValue } }) => {
    setCommand(newValue)
  }

  const handleKeyPressed = ({ key }) => {
    if (key === 'Enter') {
      handleOnEnter(command)
      setCommand('')
    }
  }

  return (
    <InputWrapper ref={inputReference}>
      <Hash>$</Hash>

      <Input
        type='text'
        onChange={handleCommandChange}
        onKeyDown={handleKeyPressed}
        value={command}
        autoFocus
      />
    </InputWrapper>
  )
}
