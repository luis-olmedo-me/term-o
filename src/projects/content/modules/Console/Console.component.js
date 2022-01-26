import React, { useEffect, useRef, useState } from 'react'

import terminal from 'libs/easy-terminal'

import { commands, keywords, theme } from './Commands'
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

terminal.setValidCommands(commands)

export const Console = ({ isOpen }) => {
  const [histories, setHistories] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')

  // const inputRef = useRef(null)
  // const historyRef = useRef(null)

  const handleCommandRun = () => {
    const command = commandParser(currentCommand.split(' ').slice())
    console.debug('command', command)

    setHistories([...histories, currentCommand])
    setCurrentCommand('')

    setTimeout(() => {
      // historyRef?.current?.scrollTo(0, historyRef.current.scrollHeight)
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
        // inputRef?.current?.focus()
      }
    },
    [isOpen]
  )

  return (
    isOpen && (
      <ConsoleWrapper>
        <ConsoleContent>
          <ConsoleTitle>Console</ConsoleTitle>

          <ConsoleLogs>
            {histories.map((history, index) => {
              return <p key={index}>{history}</p>
            })}
          </ConsoleLogs>

          <ConsoleInput
            type='text'
            // inputRef={inputRef}
            onChange={handleCommandChange}
            onKeyDown={handleKeyPressed}
            value={currentCommand}
          />
        </ConsoleContent>
      </ConsoleWrapper>
    )
  )
}
