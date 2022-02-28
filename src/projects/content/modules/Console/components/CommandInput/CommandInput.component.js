import React, { useState } from 'react'
import { Hash, Input, InputWrapper, Suggestions } from './CommandInput.styles'

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
    <InputWrapper>
      {command && <Suggestions>suggestions...</Suggestions>}

      <div>
        <Hash>$</Hash>

        <Input
          ref={inputReference}
          type='text'
          onChange={handleCommandChange}
          onKeyDown={handleKeyPressed}
          value={command}
          autoFocus
        />
      </div>
    </InputWrapper>
  )
}
