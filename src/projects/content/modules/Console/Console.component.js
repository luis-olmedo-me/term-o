import React, { useCallback, useEffect, useRef, useState } from 'react'

import { commander } from 'libs/easy-commander/easyCommander.service'

import { CommandInput } from './components/CommandInput/CommandInput.component.js'

import {
  eventTypes,
  extensionKeyEvents
} from 'src/constants/events.constants.js'

import { ConsoleContent, ConsoleTitle, ConsoleLogs } from './Console.styles.js'

import { usePageEvents } from './hooks/usePageEvents.hook.js'
import { useResize } from '../../view/hooks/useResize/useResize.hook.js'

import {
  ContentWrapper,
  ResizerBottom,
  ResizerLeft,
  ResizerRight,
  ResizerTop
} from '../../view/Content.styles.js'
import { resizeTypes } from '../../view/hooks/useResize/useResize.constants.js'

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

  const resizeConsole = (newResizingFrom) => {
    setResizingFrom(newResizingFrom)
  }

  const stopResizeConsole = () => {
    setResizingFrom('')
  }

  return (
    <ContentWrapper
      ref={wrapperReference}
      opacity={isOpen ? 1 : 0}
      style={resizeData}
      ondragstart='return false;'
      ondrop='return false;'
    >
      {!isMoving ? (
        <>
          <ResizerLeft
            onMouseDown={() => resizeConsole(resizeTypes.LEFT)}
            onMouseUp={stopResizeConsole}
          />

          <ResizerRight
            onMouseDown={() => resizeConsole(resizeTypes.RIGHT)}
            onMouseUp={stopResizeConsole}
          />
          <ResizerTop
            onMouseDown={() => resizeConsole(resizeTypes.TOP)}
            onMouseUp={stopResizeConsole}
          />
          <ResizerBottom
            onMouseDown={() => resizeConsole(resizeTypes.BOTTOM)}
            onMouseUp={stopResizeConsole}
          />
        </>
      ) : null}

      <ConsoleContent isOpen={isOpen} isMoving={isMoving}>
        <ConsoleTitle
          ref={titleReference}
          onMouseDown={(event) => {
            resizeConsole(resizeTypes.MOVING)
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
    </ContentWrapper>
  )
}
