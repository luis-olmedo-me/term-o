import React, { useEffect, useRef, useState } from 'react'
import {
  Hash,
  Input,
  InputWrapper,
  Suggestion,
  Suggestions
} from './CommandInput.styles'
import { commander } from 'libs/easy-commander/easyCommander.service'

export const CommandInput = ({ inputReference, handleOnEnter }) => {
  const selectedSuggestionReference = useRef(null)

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

  useEffect(
    function scrollIntoSelectedSuggestion() {
      const scrollTop = selectedSuggestionReference.current?.scrollTop
      const hasScrollTop = typeof scrollTop !== 'undefined'

      if (!suggestions.length) return
      if (!hasScrollTop) return

      const newScrollTopValue = selectedSuggestionId * 36
      const isInRange =
        newScrollTopValue > scrollTop && newScrollTopValue < scrollTop + 108

      if (isInRange) return

      selectedSuggestionReference.current.scrollTop = Math.max(
        newScrollTopValue - 72,
        0
      )
    },
    [suggestions, selectedSuggestionId]
  )

  return (
    <InputWrapper>
      {shouldShowSuggestions && (
        <Suggestions ref={selectedSuggestionReference}>
          {suggestions.map((suggestion, index) => {
            const isSelected = selectedSuggestionId === index
            const aliases = suggestion.aliases || []

            return (
              <Suggestion key={suggestion.value} selected={isSelected}>
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
