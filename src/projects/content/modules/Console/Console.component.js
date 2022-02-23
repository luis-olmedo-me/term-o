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

export const Console = ({ isOpen, totalHeight }) => {
  const titleReference = useRef(null)
  const inputReference = useRef(null)

  const [histories, setHistories] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandId, setCommandId] = useState(0)
  const [pageEvents, setPageEvents] = useState([])
  let auxiliarId = 0

  const historyRef = useRef(null)

  const handleCommandRun = useCallback((command) => {
    const generatedId = `${commandId}-${auxiliarId}`
    const logOutput = commander.getLogOutput(generatedId, command)

    setHistories((histories) => [...histories, logOutput])
    setCurrentCommand('')
    setCommandId((id) => ++id)
    auxiliarId++

    setTimeout(() => {
      historyRef?.current?.scrollTo(0, historyRef.current.scrollHeight)
    })
  }, [])

  useEffect(
    function getPageEvents() {
      const receivePageEvents = ({ response: newPageEvents }) => {
        newPageEvents.forEach((pageEvent) => {
          const validURL = window.location.origin.match(
            new RegExp(pageEvent.url)
          )

          if (!validURL) return

          handleCommandRun(pageEvent.command)
        })

        setPageEvents(newPageEvents)
      }

      backgroundRequest({
        eventType: eventTypes.GET_PAGE_EVENTS,
        callback: receivePageEvents
      })
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

  const outsideProps = { pageEvents }

  const titleHeight = titleReference.current?.offsetHeight || 0
  const inputHeight = inputReference.current?.offsetHeight || 0

  const consoleStyles = {
    height: totalHeight - titleHeight - inputHeight
  }

  return (
    <ConsoleContent isOpen={isOpen}>
      <ConsoleTitle ref={titleReference}>TERM-O</ConsoleTitle>

      <ConsoleLogs
        id='term-o-console-logs'
        ref={historyRef}
        style={consoleStyles}
      >
        {histories.map((history) => history(outsideProps))}
      </ConsoleLogs>

      <ConsoleInputWrapper ref={inputReference}>
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
  )
}
