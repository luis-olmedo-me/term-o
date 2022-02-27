import React, { useCallback, useEffect, useRef, useState } from 'react'

import { commander } from 'libs/easy-commander/easyCommander.service'

import { CommandInput } from './components/CommandInput/CommandInput.component.js'
import { Resizer } from './components/Resizer/Resizer.component.js'

import {
  eventTypes,
  extensionKeyEvents
} from 'src/constants/events.constants.js'
import {
  resizeTypes,
  singleResizeTypes
} from './hooks/useResize/useResize.constants.js'

import {
  ConsoleContent,
  ConsoleTitle,
  ConsoleLogs,
  ConsoleWrapper,
  ResizerBottom,
  ResizerLeft,
  ResizerRight,
  ResizerTop
} from './Console.styles.js'

import { usePageEvents } from './hooks/usePageEvents.hook.js'
import { useResize } from './hooks/useResize/useResize.hook.js'

export const Console = () => {
  const wrapperReference = useRef(null)
  const titleReference = useRef(null)
  const historyRef = useRef(null)
  const inputReference = useRef(null)

  const [histories, setHistories] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const { setResizingFrom, resizeData, setMovingFrom, isMoving } = useResize({
    wrapperReference
  })
  const { pageEvents, appliedPageEvents } = usePageEvents()

  useEffect(function openConsoleByKeyCommands() {
    const toggleTerminal = (message, _sender, sendResponse) => {
      if (message.action !== eventTypes.NEW_COMMAND) return

      switch (message.data.command) {
        case extensionKeyEvents.TOGGLE_TERMINAL:
          setIsOpen((state) => !state)
          break
      }

      sendResponse({ status: 'ok' })
    }

    chrome.extension.onMessage.addListener(toggleTerminal)

    return () => chrome.extension.onMessage.removeListener(toggleTerminal)
  }, [])

  const handleCommandRun = useCallback((command, id) => {
    const logOutput = commander.getLogOutput(id, command)

    setHistories((histories) => [...histories, logOutput])

    setTimeout(() => {
      historyRef?.current?.scrollTo(0, historyRef.current.scrollHeight)
    })
  }, [])

  useEffect(
    function applyPageEvents() {
      appliedPageEvents.forEach(({ command }, id) => {
        handleCommandRun(command, id)
      })
    },
    [appliedPageEvents, handleCommandRun]
  )

  const outsideProps = { pageEvents }

  const consoleStyles = {
    paddingTop: parseInt(titleReference.current?.offsetHeight || 0) + 10,
    paddingBottom: parseInt(inputReference.current?.offsetHeight || 0) + 10
  }

  return (
    <ConsoleWrapper
      ref={wrapperReference}
      opacity={isOpen ? 1 : 0}
      style={resizeData}
      ondragstart='return false;'
      ondrop='return false;'
    >
      {!isMoving
        ? singleResizeTypes.map((resizeType) => (
            <Resizer
              key={resizeType}
              resizeType={resizeType}
              setResizingFrom={setResizingFrom}
            />
          ))
        : null}

      <ConsoleContent isOpen={isOpen} isMoving={isMoving}>
        <ConsoleTitle
          ref={titleReference}
          onMouseDown={(event) => {
            setResizingFrom(resizeTypes.MOVING)
            setMovingFrom({ x: event.clientX, y: event.clientY })
          }}
        >
          TERM-O
        </ConsoleTitle>

        <ConsoleLogs ref={historyRef} style={consoleStyles}>
          {histories.map((history) => history(outsideProps))}
        </ConsoleLogs>

        <CommandInput
          inputReference={inputReference}
          handleOnEnter={(command) =>
            handleCommandRun(command, histories.length)
          }
        />
      </ConsoleContent>
    </ConsoleWrapper>
  )
}
