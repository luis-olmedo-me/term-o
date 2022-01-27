import React, { useEffect, useRef, useState } from 'react'

import terminal from 'libs/easy-terminal'

import { commands, consoleCommands, keywords, theme } from './Commands'
import { HistoryInterpreter } from './components/HistoryInterpreter/HistoryInterpreter.component'
import { CommandInput } from './components/CommandInput/CommandInput.component'
import { range } from './Helpers/range.helpers'

import commandParser from 'minimist'

import {
  ConsoleWrapper,
  ConsoleContent,
  ConsoleTitle,
  ConsoleInput,
  ConsoleLogs
} from './Console.styles.js'
import { buildProps } from './Helpers/console.helpers'

terminal.setValidCommands(commands)

export const Console = ({ isOpen }) => {
  const [histories, setHistories] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandId, setCcommandId] = useState(0)

  const inputRef = useRef(null)
  const historyRef = useRef(null)

  const handleCommandRun = () => {
    const [command, ...args] = currentCommand.split(' ')
    const data = commandParser(args)
    const props = { ...buildProps(data), command: currentCommand }
    console.log('props', props)

    const knownCommand = consoleCommands[command]

    if (!knownCommand) return console.log('error')

    setHistories([
      ...histories,
      knownCommand.output({ ...props, id: commandId })
    ])
    setCurrentCommand('')
    setCcommandId((id) => ++id)

    setTimeout(() => {
      historyRef?.current?.scrollTo(0, historyRef.current.scrollHeight)
    })
  }

  const handleCommandChange = ({ target: { value: newValue } }) => {
    setCurrentCommand(newValue)
  }

  const handleKeyPressed = ({ key }) => {
    if (key === 'Enter') {
      handleCommandRun()
    }
  }

  useEffect(
    function focusOnTheInput() {
      if (isOpen) {
        inputRef?.current?.focus()
      }
    },
    [isOpen]
  )

  return (
    isOpen && (
      <ConsoleWrapper>
        <ConsoleContent>
          <ConsoleTitle>Console</ConsoleTitle>

          <ConsoleLogs ref={historyRef}>{histories}</ConsoleLogs>

          <ConsoleInput
            type='text'
            ref={inputRef}
            onChange={handleCommandChange}
            onKeyDown={handleKeyPressed}
            value={currentCommand}
          />
        </ConsoleContent>
      </ConsoleWrapper>
    )
  )
}
