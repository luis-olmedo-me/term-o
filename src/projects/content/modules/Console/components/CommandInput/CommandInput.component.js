import React, { useState } from 'react'
import { Hash, Input, InputWrapper, Suggestions } from './CommandInput.styles'
import { commander } from 'libs/easy-commander/easyCommander.service'

export const CommandInput = ({ inputReference, handleOnEnter }) => {
  const [command, setCommand] = useState('')
  const [suggestions, setSuggestions] = useState({})
  const [selectedSuggestionId, setSelectedSuggestionId] = useState(0)

  const handleCommandChange = ({ target: { value: newValue } }) => {
    const newSuggestions = commander.getSuggestions(newValue)

    setCommand(newValue)
    setSuggestions(newSuggestions)
  }

  const handleKeyPressed = (event) => {
    const { key } = event

    if (key === 'Enter') {
      const selectedSuggestion = suggestions[suggestions.length - 1]

      if (!selectedSuggestion) {
        handleOnEnter(command)
        setCommand('')
      } else {
        const args = command.split(' ')
        const firstArguments = args.splice(0, args.length - 1)

        const newCommand = firstArguments.length
          ? `${firstArguments.join(' ')} ${selectedSuggestion.value}`
          : selectedSuggestion.value

        setCommand(newCommand)
        setSelectedSuggestionId(0)
      }
    } else if (key === 'ArrowUp') {
      event.preventDefault()

      setSelectedSuggestionId((indexId) => {
        const nextId = Number(indexId) - 1
        const validatedId = nextId < 0 ? suggestions.length - 1 : nextId

        return validatedId
      })
    } else if (key === 'ArrowDown') {
      event.preventDefault()

      setSelectedSuggestionId((indexId) => {
        const nextId = Number(indexId) + 1
        const validatedId = nextId > suggestions.length - 1 ? 0 : nextId

        return validatedId
      })
    }
  }

  const selectedIdInRange =
    selectedSuggestionId !== null && selectedSuggestionId % suggestions.length

  return (
    <InputWrapper>
      {command && (
        <Suggestions>
          {suggestions.map((suggestion, index) => {
            const isSelected = selectedIdInRange === index
            const styles = isSelected ? { color: '#9af' } : {}

            return (
              <p key={suggestion.value} style={styles}>
                {suggestion.value}
              </p>
            )
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
