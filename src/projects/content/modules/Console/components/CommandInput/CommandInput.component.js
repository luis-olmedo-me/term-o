import React, { useState } from 'react'

import { commander } from 'libs/commander/commander.service'

import { Suggestions } from '../Suggestions/Suggestions.component'

import { Hash, Input, InputWrapper } from './CommandInput.styles'
import { spliceArg } from './CommandInput.helpers'

const defaultSuggestion = { value: '< Execute >' }

export const CommandInput = ({ inputReference, handleOnEnter }) => {
  const [command, setCommand] = useState('')
  const [commands, setCommands] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestionId, setSelectedSuggestionId] = useState(0)

  const handleNewCaretPosition = (position) => {
    setTimeout(() => (inputReference.current.selectionEnd = position))
  }

  const handleSelectSuggestion = (selectedId) => {
    const caretPosition = inputReference.current?.selectionEnd || 0

    if (selectedId === 0) {
      handleOnEnter(command)
      setCommands([
        ...commands,
        { command, id: commands.length, selected: false }
      ])
      setCommand('')
      setSuggestions([])
      setSelectedSuggestionId(0)
    } else {
      const { value, alias } = suggestions[selectedId]

      const temporalCommand = command.slice(0, caretPosition).trim()
      const lastWord = temporalCommand.split(' ').at(-1)

      const isExpectingAlias = /^-[^-]/.test(lastWord) || lastWord === '-'
      const hasValidAlias = alias !== '-'

      const newCommand = spliceArg(
        command,
        caretPosition,
        isExpectingAlias && hasValidAlias ? alias : value,
        handleNewCaretPosition
      )

      setCommand(newCommand)
      setSelectedSuggestionId(0)
    }
  }

  const handleKeyUp = ({ target: { selectionEnd }, key }) => {
    const temporalCommand = command.slice(0, selectionEnd)
    const isLastLetterSpecial = [' ', '|'].includes(temporalCommand.at(-1))

    if (!command) return
    if (key === 'Enter') {
      handleSelectSuggestion(selectedSuggestionId)

      return
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      return
    }

    const temporalSpacedCommand = temporalCommand
      .replace(/"/g, ' " ')
      .replace(/'/g, " ' ")
    const lastWord = temporalSpacedCommand.split(' ').at(-1)

    const newSuggestions = commander
      .getSuggestions(temporalSpacedCommand)
      .filter(
        (suggestion) =>
          suggestion.value.includes(lastWord) ||
          suggestion.alias?.includes(lastWord)
      )

    const { index: indexMatch } = newSuggestions.reduce(
      (lastMatch, suggestion, index) => {
        const [matchWord] =
          suggestion.value.match(lastWord) ||
          suggestion.alias?.match(lastWord) ||
          []
        const matches = matchWord?.length

        const isValueMatch =
          suggestion.value.startsWith(lastWord) ||
          suggestion.alias?.startsWith(lastWord)
        const isValidMatch = isValueMatch && lastMatch.matches < matches

        return isValidMatch ? { index, matches } : lastMatch
      },
      { index: -1, matches: 0 }
    )

    setSuggestions(
      temporalCommand && !isLastLetterSpecial
        ? [defaultSuggestion, ...newSuggestions]
        : []
    )
    setSelectedSuggestionId(indexMatch === -1 ? 0 : indexMatch + 1)
  }

  const handleKeyPressed = (event) => {
    const { key } = event

    if (key === 'ArrowUp') {
      event.preventDefault()

      if (!suggestions.length && commands.length) {
        const commandSelected = commands.find((command) => command.selected)

        if (commandSelected) {
          const { id } = commandSelected
          const newId = id - 1
          const isValidId = newId >= 0 && newId < commands.length

          if (isValidId) {
            const newCommands = commands.map((command) => ({
              ...command,
              selected: command.id === newId
            }))

            setCommands(newCommands)
            setCommand(newCommands[newId].command)
          }
        } else {
          const defaultCommandSelected = commands.at(-1)
          const newCommands = commands.map((command) => ({
            ...command,
            selected: command.id === defaultCommandSelected.id
          }))

          setCommand(defaultCommandSelected.command)
          setCommands(newCommands)
        }

        return
      }

      setSelectedSuggestionId((indexId) => {
        const nextId = Number(indexId) - 1
        const validatedId = nextId < 0 ? suggestions.length - 1 : nextId

        return validatedId
      })
    } else if (key === 'ArrowDown') {
      event.preventDefault()

      if (!suggestions.length && commands.length) {
        const commandSelected = commands.find((command) => command.selected)

        if (commandSelected) {
          const { id } = commandSelected
          const newId = id + 1
          const isValidId = newId >= 0 && newId < commands.length

          if (isValidId) {
            const newCommands = commands.map((command) => ({
              ...command,
              selected: command.id === newId
            }))

            setCommands(newCommands)
            setCommand(newCommands[newId].command)
          }
        }

        return
      }

      setSelectedSuggestionId((indexId) => {
        const nextId = Number(indexId) + 1
        const validatedId = nextId > suggestions.length - 1 ? 0 : nextId

        return validatedId
      })
    } else {
      const hasCommandSelected = commands.find((command) => command.selected)

      if (hasCommandSelected) {
        const commandWithNoSelected = commands.map((command) => ({
          ...command,
          selected: false
        }))

        setCommands(commandWithNoSelected)
      }
    }
  }

  return (
    <InputWrapper>
      <Suggestions
        suggestions={suggestions}
        selectedId={selectedSuggestionId}
        onSuggestionClick={handleSelectSuggestion}
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
          spellcheck='false'
        />
      </div>
    </InputWrapper>
  )
}
