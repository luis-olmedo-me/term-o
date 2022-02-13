import React, { useEffect, useRef, useState } from 'react'

import { commander } from 'libs/easy-commander/easyCommander.service'

import {
  ConsoleWrapper,
  ConsoleContent,
  ConsoleTitle,
  ConsoleInput,
  ConsoleLogs,
  ConsoleInputWrapper,
  ConsoleHash
} from './Console.styles.js'

export const Console = ({ isOpen }) => {
  const [histories, setHistories] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandId, setCcommandId] = useState(0)

  const inputRef = useRef(null)
  const historyRef = useRef(null)

  const handleCommandRun = () => {
    const logOutput = commander.getLogOutput(commandId, currentCommand)

    setHistories([...histories, logOutput])
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
          <ConsoleTitle>TERM-O</ConsoleTitle>

          <ConsoleLogs id='term-o-console-logs' ref={historyRef}>
            {histories}
          </ConsoleLogs>

          <ConsoleInputWrapper>
            <ConsoleHash>$</ConsoleHash>

            <ConsoleInput
              type='text'
              ref={inputRef}
              onChange={handleCommandChange}
              onKeyDown={handleKeyPressed}
              value={currentCommand}
            />
          </ConsoleInputWrapper>
        </ConsoleContent>
      </ConsoleWrapper>
    )
  )
}
