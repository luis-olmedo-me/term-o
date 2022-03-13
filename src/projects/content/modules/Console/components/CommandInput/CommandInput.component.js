import React, { useState } from 'react'

import { commander } from 'libs/easy-commander/easyCommander.service'

import { Suggestions } from '../Suggestions/Suggestions.component'

import { Hash, Input, InputWrapper } from './CommandInput.styles'

export const CommandInput = ({ inputReference, handleOnEnter }) => {
  const [command, setCommand] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestionId, setSelectedSuggestionId] = useState(0)

  const handleCommandChange = ({ target: { value: newValue } }) => {
    const newSuggestions = commander.getSuggestions(newValue)

    setCommand(newValue)
    setSuggestions(newValue ? newSuggestions : [])
    setSelectedSuggestionId(0)
  }

  const handleKeyPressed = (event) => {
    event.stopPropagation()
    const { key } = event

    if (key === 'Enter') {
      if (!shouldShowSuggestions) {
        handleOnEnter(command)
        setCommand('')
        setSuggestions([])
        setSelectedSuggestionId(0)
      } else {
        const selectedSuggestion = suggestions[selectedSuggestionId]

        const args = command.split(' ')
        const firstArguments = args.splice(0, args.length - 1)

        const newCommand = firstArguments.length
          ? `${firstArguments.join(' ')} ${selectedSuggestion.value} `
          : `${selectedSuggestion.value} `

        const newSuggestions = commander.getSuggestions(newCommand)

        setCommand(newCommand)
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
    } else if (key === '|') {
      event.preventDefault()

      const newCommand = `${command}| `
      const newSuggestions = commander.getSuggestions(newCommand)

      setCommand(newCommand)
      setSuggestions(newCommand ? newSuggestions : [])
      setSelectedSuggestionId(0)
    }
  }

  const [lastCommand] = command.split('|').reverse()
  const lastArgs = lastCommand.trimLeft().split(' ')

  const areSuggestionsAvailable =
    lastArgs.at(-1).startsWith('-') || lastArgs.length === 1
  const shouldShowSuggestions =
    Boolean(suggestions.length) && areSuggestionsAvailable

  return (
    <InputWrapper>
      {shouldShowSuggestions && (
        <Suggestions
          suggestions={suggestions}
          selectedSuggestionId={selectedSuggestionId}
        />
      )}

      <div>
        <Hash>$</Hash>

        <Input
          ref={inputReference}
          type='text'
          onChange={handleCommandChange}
          onKeyDown={handleKeyPressed}
          value={command}
        />
      </div>
    </InputWrapper>
  )
}
