import React, { useState } from 'react'

import { commander } from 'libs/easy-commander/easyCommander.service'

import { Suggestions } from '../Suggestions/Suggestions.component'

import { Hash, Input, InputWrapper } from './CommandInput.styles'

export const CommandInput = ({ inputReference, handleOnEnter }) => {
  const [command, setCommand] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestionId, setSelectedSuggestionId] = useState(0)

  const handleKeyUp = ({ target: { selectionEnd, key } }) => {
    const temporalCommand = command.slice(0, selectionEnd)
    const newSuggestions = commander.getSuggestions(temporalCommand)

    const [lastArg] = temporalCommand.split(' ').reverse()

    setSuggestions(temporalCommand ? newSuggestions : [])
    setSelectedSuggestionId(
      selectedSuggestionId > newSuggestions.length - 1
        ? 0
        : selectedSuggestionId
    )
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

  const shouldShowSuggestions = Boolean(suggestions.length)

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
          onKeyDown={handleKeyPressed}
          onKeyUp={handleKeyUp}
          onChange={(event) => setCommand(event.target.value)}
          value={command}
        />
      </div>
    </InputWrapper>
  )
}
