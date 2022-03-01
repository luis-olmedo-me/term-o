import React, { useState } from 'react'
import {
  Hash,
  Input,
  InputWrapper,
  Suggestion,
  Suggestions
} from './CommandInput.styles'
import { commander } from 'libs/easy-commander/easyCommander.service'

export const CommandInput = ({ inputReference, handleOnEnter }) => {
  const [command, setCommand] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestionId, setSelectedSuggestionId] = useState(0)

  const handleCommandChange = ({ target: { value: newValue } }) => {
    const newSuggestions = commander.getSuggestions(newValue)

    setCommand(newValue)
    setSuggestions(newSuggestions)
    setSelectedSuggestionId(newSuggestions.length - 1)
  }

  const handleKeyPressed = (event) => {
    const { key } = event

    if (key === 'Enter') {
      if (!shouldShowSuggestions) {
        handleOnEnter(command)
        setCommand('')
        setSuggestions([])
      } else {
        const selectedSuggestion = suggestions[selectedSuggestionId]

        const args = command.split(' ')
        const firstArguments = args.splice(0, args.length - 1)

        const newCommand = firstArguments.length
          ? `${firstArguments.join(' ')} ${selectedSuggestion.value} `
          : `${selectedSuggestion.value} `

        const newSuggestions = commander.getSuggestions(newCommand)

        setCommand(newCommand)
        setSelectedSuggestionId(newSuggestions.length - 1)
        setSuggestions(newSuggestions)
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

  const [lastCommand] = command.split('|').reverse()
  const lastArgs = lastCommand.split(' ')

  const areSuggestionsAvailable =
    lastArgs.at(-1).startsWith('-') || lastArgs.length === 1
  const shouldShowSuggestions =
    Boolean(suggestions.length) && areSuggestionsAvailable

  return (
    <InputWrapper>
      {shouldShowSuggestions && (
        <Suggestions>
          {suggestions.map((suggestion, index) => {
            const isSelected = selectedSuggestionId === index
            const styles = isSelected ? { color: '#9af' } : {}
            const aliases = suggestion.aliases || []

            return (
              <Suggestion
                key={suggestion.value}
                style={styles}
                selected={isSelected}
              >
                <span>{suggestion.value}</span>
                <span>{aliases.join(', ')}</span>
              </Suggestion>
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
