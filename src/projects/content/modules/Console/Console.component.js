import React, { useCallback, useEffect, useRef, useState } from 'react'

import { commander } from 'libs/easy-commander/easyCommander.service'

import { ConsoleContent, ConsoleTitle, ConsoleLogs } from './Console.styles.js'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { CommandInput } from './components/CommandInput/CommandInput.component.js'

export const Console = ({ isOpen, onTitleClick, isMoving }) => {
  const titleReference = useRef(null)
  const inputReference = useRef(null)

  const [histories, setHistories] = useState([])
  const [commandId, setCommandId] = useState(0)
  const [pageEvents, setPageEvents] = useState([])
  let auxiliarId = 0

  const historyRef = useRef(null)

  const handleCommandRun = useCallback((command) => {
    const generatedId = `${commandId}-${auxiliarId}`
    const logOutput = commander.getLogOutput(generatedId, command)

    setHistories((histories) => [...histories, logOutput])
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

  const outsideProps = { pageEvents }

  const consoleStyles = {
    paddingTop: parseInt(titleReference.current?.offsetHeight || 0) + 10,
    paddingBottom: parseInt(inputReference.current?.offsetHeight || 0) + 10
  }

  return (
    <ConsoleContent isOpen={isOpen} isMoving={isMoving}>
      <ConsoleTitle ref={titleReference} onMouseDown={onTitleClick}>
        TERM-O
      </ConsoleTitle>

      <ConsoleLogs
        id='term-o-console-logs'
        ref={historyRef}
        style={consoleStyles}
      >
        {histories.map((history) => history(outsideProps))}
      </ConsoleLogs>

      <CommandInput
        inputReference={inputReference}
        handleOnEnter={handleCommandRun}
      />
    </ConsoleContent>
  )
}
