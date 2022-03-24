import React, { useCallback, useEffect, useRef, useState } from 'react'

import { commander } from 'libs/easy-commander/commander.service'

import { CommandInput } from './components/CommandInput/CommandInput.component.js'
import { Resizer } from './components/Resizer/Resizer.component.js'

import {
  resizeTypes,
  singleResizeTypes
} from './hooks/useResize/useResize.constants.js'

import { useConfig } from './hooks/useConfig.hook.js'
import { useResize } from './hooks/useResize/useResize.hook.js'

import { ConsoleTitle, ConsoleLogs, ConsoleWrapper } from './Console.styles.js'

export const Console = () => {
  const wrapperReference = useRef(null)
  const titleReference = useRef(null)
  const historyRef = useRef(null)
  const inputReference = useRef(null)

  const [histories, setHistories] = useState([])
  const [hasPageEventsBeenRunned, setHasPageEventsBeenRunned] = useState(false)

  const { isOpen, appliedPageEvents, consolePosition } = useConfig()
  const { setResizingFrom, resizeData, setMovingFrom, isMoving } = useResize({
    wrapperReference,
    consolePosition
  })

  const handleCommandRun = useCallback((command, id) => {
    const formmatedCommand = commander.getCommandWithAliases(command)

    const logOutput = commander.getLogOutput(id, formmatedCommand)

    setHistories((histories) => [...histories, logOutput])

    setTimeout(() => {
      historyRef?.current?.scrollTo(0, historyRef.current.scrollHeight)
    })
  }, [])

  useEffect(
    function applyPageEvents() {
      if (hasPageEventsBeenRunned) return

      appliedPageEvents.forEach(({ command }, id) => {
        handleCommandRun(command, id)
      })

      if (appliedPageEvents.length) setHasPageEventsBeenRunned(true)
    },
    [appliedPageEvents, handleCommandRun, hasPageEventsBeenRunned]
  )

  useEffect(
    function focusOnInputWhenConsoleIsOpen() {
      if (isOpen) {
        inputReference.current?.focus()
      }
    },
    [isOpen]
  )

  const outsideProps = {
    clearTerminal: () => setHistories([])
  }

  const consoleStyles = {
    paddingTop: parseInt(titleReference.current?.offsetHeight || 0) + 10,
    paddingBottom: parseInt(inputReference.current?.offsetHeight || 0) + 10
  }

  const cancelEventPropagation = (event) => {
    event.stopPropagation()
  }

  return (
    <ConsoleWrapper
      ref={wrapperReference}
      isOpen={isOpen}
      style={resizeData}
      ondragstart='return false;'
      ondrop='return false;'
      onMouseDown={() => setTimeout(() => inputReference.current?.focus())}
      onKeyDown={cancelEventPropagation}
      onKeyUp={cancelEventPropagation}
      onKeyPress={cancelEventPropagation}
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
        handleOnEnter={(command) => handleCommandRun(command, histories.length)}
      />
    </ConsoleWrapper>
  )
}
