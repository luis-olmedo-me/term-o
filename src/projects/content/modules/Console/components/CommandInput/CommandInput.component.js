import React, { useState } from 'react'

import { commander } from 'libs/easy-commander/easyCommander.service'

import { Suggestions } from '../Suggestions/Suggestions.component'

import { Hash, Input, InputWrapper } from './CommandInput.styles'

const splice = function (myString, index, value) {
  return myString.slice(0, index) + value + myString.slice(index)
}

const spliceArg = function (myString, index, value) {
  let words = myString.split(' ')
  let letterCounter = 0

  if (myString.length === index) {
    words[words.length - 1] = value

    return words.join(' ')
  }

  for (const wordIndex in words) {
    const word = words[wordIndex]
    letterCounter += word.length

    if (letterCounter >= index) {
      words[wordIndex] = value
      break
    }
  }

  return words.join(' ')
}

export const CommandInput = ({ inputReference, handleOnEnter }) => {
  const [command, setCommand] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestionId, setSelectedSuggestionId] = useState(0)

  const handleKeyUp = ({ target: { selectionEnd }, key }) => {
    const temporalCommand = command.slice(0, selectionEnd)
    const isLastLetterSpace = temporalCommand.at(-1) === ' '

    if (key === 'Enter') {
      if (selectedSuggestionId === 0) {
        handleOnEnter(command)
        setCommand('')
        setSuggestions([])
        setSelectedSuggestionId(0)
      } else {
        const { value } = suggestions[selectedSuggestionId]

        const newCommand = isLastLetterSpace
          ? splice(temporalCommand, selectionEnd, value)
          : spliceArg(temporalCommand, selectionEnd, value)

        setCommand(newCommand)
      }

      return
    }

    const newSuggestions = [
      { value: 'Hit enter to execute' },
      ...commander.getSuggestions(temporalCommand)
    ]

    const isSelectedIndexOutOfRange =
      selectedSuggestionId > newSuggestions.length - 1

    setSuggestions(temporalCommand && !isLastLetterSpace ? newSuggestions : [])
    setSelectedSuggestionId(
      isSelectedIndexOutOfRange ? 0 : selectedSuggestionId
    )
  }

  const handleKeyPressed = (event) => {
    event.stopPropagation()
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
    } else if (key === '|') {
      event.preventDefault()

      const newCommand = `${command}| `
      const newSuggestions = commander.getSuggestions(newCommand)

      setCommand(newCommand)
      setSuggestions(newCommand ? newSuggestions : [])
      setSelectedSuggestionId(0)
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
