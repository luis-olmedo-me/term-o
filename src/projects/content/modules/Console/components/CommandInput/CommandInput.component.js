import React, { useState } from 'react'

import { commander } from 'libs/easy-commander/easyCommander.service'

import { Suggestions } from '../Suggestions/Suggestions.component'

import { Hash, Input, InputWrapper } from './CommandInput.styles'
import { splice, spliceArg } from './CommandInput.helpers'

const defaultSuggestion = { value: 'Hit enter to execute' }

export const CommandInput = ({ inputReference, handleOnEnter }) => {
  const [command, setCommand] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestionId, setSelectedSuggestionId] = useState(0)

  const handleKeyUp = ({ target: { selectionEnd }, key }) => {
    const temporalCommand = command.slice(0, selectionEnd)
    const isLastLetterSpecial = [' ', '|'].includes(temporalCommand.at(-1))

    if (key === 'Enter') {
      if (selectedSuggestionId === 0) {
        handleOnEnter(command)
        setCommand('')
        setSuggestions([])
        setSelectedSuggestionId(0)
      } else {
        const { value } = suggestions[selectedSuggestionId]

        const newCommand = isLastLetterSpecial
          ? splice(command, selectionEnd, value)
          : spliceArg(command, selectionEnd, value)

        setCommand(newCommand)
        setSelectedSuggestionId(0)
      }

      return
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      return
    }

    const temporalSpacedCommand = temporalCommand
      .replace(/"/g, ' " ')
      .replace(/'/g, " ' ")
    const lastWord = temporalCommand.split(' ').at(-1)

    const filteredSuggestions = commander
      .getSuggestions(temporalSpacedCommand)
      .filter((suggestion) => suggestion.value.includes(lastWord))

    const newSuggestions = [defaultSuggestion, ...filteredSuggestions]

    setSuggestions(
      temporalCommand && !isLastLetterSpecial ? newSuggestions : []
    )
    setSelectedSuggestionId(0)
  }

  const handleKeyPressed = (event) => {
    const { key } = event

    if (key === 'ArrowUp') {
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

  return (
    <InputWrapper>
      <Suggestions
        suggestions={suggestions}
        selectedSuggestionId={selectedSuggestionId}
      />

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
