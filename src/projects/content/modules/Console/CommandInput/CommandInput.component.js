import React from 'react'
import {
  ConsoleHash,
  ConsoleInput,
  ConsoleInputWrapper
} from './CommandInput.styles'

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
    <ConsoleInputWrapper ref={inputReference}>
      <ConsoleHash>$</ConsoleHash>

      <ConsoleInput
        type='text'
        onChange={handleCommandChange}
        onKeyDown={handleKeyPressed}
        value={currentCommand}
        autoFocus
      />
    </ConsoleInputWrapper>
  )
}
