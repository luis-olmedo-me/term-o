import React, { useState } from 'react'

import { commander } from 'libs/commander/commander.service'

import { Suggestions } from '../Suggestions/Suggestions.component'

import { Hash, Input, InputWrapper } from './CommandInput.styles'
import { splice, spliceArg } from './CommandInput.helpers'

const defaultSuggestion = { value: 'Hit enter to execute' }

export const CommandInput = ({ inputReference, handleOnEnter }) => {
  const [command, setCommand] = useState('')
  const [commands, setCommands] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestionId, setSelectedSuggestionId] = useState(0)

  const handleKeyUp = ({ target: { selectionEnd }, key }) => {
    const temporalCommand = command.slice(0, selectionEnd)
    const isLastLetterSpecial = [' ', '|'].includes(temporalCommand.at(-1))

    if (key === 'Enter') {
      if (selectedSuggestionId === 0) {
        handleOnEnter(command)
        setCommands([
          ...commands,
          { command, id: commands.length, selected: false }
        ])
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
      .filter(
        (suggestion) =>
          suggestion.value.includes(lastWord) ||
          suggestion.aliases?.some((alias) => alias.includes(lastWord))
      )

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
          spellcheck='false'
        />
      </div>
    </InputWrapper>
  )
}
