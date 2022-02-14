import React, { useCallback, useEffect, useRef, useState } from 'react'

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
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'

export const Console = ({ isOpen }) => {
  const [histories, setHistories] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandId, setCommandId] = useState(0)

  const historyRef = useRef(null)

  const handleCommandRun = useCallback((command) => {
    const logOutput = commander.getLogOutput(commandId, command)

    setHistories((histories) => [...histories, logOutput])
    setCurrentCommand('')
    setCommandId((id) => ++id)

    setTimeout(() => {
      historyRef?.current?.scrollTo(0, historyRef.current.scrollHeight)
    })
  }, [])

  useEffect(
    function getPageEvents() {
      const receivePageEvents = ({ response: pageEvents }) => {
        pageEvents.forEach((pageEvent) => {
          if (window.location.origin !== pageEvent.url) return

          handleCommandRun(pageEvent.command)
        })
      }

      backgroundRequest(eventTypes.GET_PAGE_EVENTS, receivePageEvents)
    },
    [handleCommandRun]
  )

  const handleCommandChange = ({ target: { value: newValue } }) => {
    setCurrentCommand(newValue)
  }

  const handleKeyPressed = ({ key }) => {
    if (key === 'Enter') {
      handleCommandRun(currentCommand)
    }
  }

  return (
    <ConsoleWrapper isOpen={isOpen}>
      <ConsoleContent>
        <ConsoleTitle>TERM-O</ConsoleTitle>

        <ConsoleLogs id='term-o-console-logs' ref={historyRef}>
          {histories}
        </ConsoleLogs>

        <ConsoleInputWrapper>
          <ConsoleHash>$</ConsoleHash>

          <ConsoleInput
            type='text'
            onChange={handleCommandChange}
            onKeyDown={handleKeyPressed}
            value={currentCommand}
            autoFocus
          />
        </ConsoleInputWrapper>
      </ConsoleContent>
    </ConsoleWrapper>
  )
}
