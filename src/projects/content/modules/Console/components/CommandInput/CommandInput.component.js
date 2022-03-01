import React, { useState } from 'react'
import { Hash, Input, InputWrapper, Suggestions } from './CommandInput.styles'
import { commander } from 'libs/easy-commander/easyCommander.service'

export const CommandInput = ({ inputReference, handleOnEnter }) => {
  const [command, setCommand] = useState('')
  const [suggestions, setSuggestions] = useState({})

  const handleCommandChange = ({ target: { value: newValue } }) => {
    const newSuggestions = commander.getSuggestions(newValue)

    setCommand(newValue)
    setSuggestions(newSuggestions)
  }

  const handleKeyPressed = ({ key }) => {
    if (key === 'Enter') {
      handleOnEnter(command)
      setCommand('')
    }
  }

  return (
    <InputWrapper>
      {command && (
        <Suggestions>
          {suggestions.map((suggestion) => {
            return <p key={suggestion.value}>{suggestion.value}</p>
          })}
        </Suggestions>
      )}

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
