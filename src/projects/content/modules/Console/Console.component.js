import React, { useCallback, useEffect, useRef, useState } from 'react'

import { commander } from 'libs/easy-commander/easyCommander.service'

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

  const { isOpen, pageEvents, appliedPageEvents, consolePosition, aliases } =
    useConfig()
  const { setResizingFrom, resizeData, setMovingFrom, isMoving } = useResize({
    wrapperReference,
    consolePosition
  })

  const handleCommandRun = useCallback(
    (command, id) => {
      const formmatedCommand = commander.getCommandWithAliases(command)

      const logOutput = commander.getLogOutput(id, formmatedCommand)

      setHistories((histories) => [...histories, logOutput])

      setTimeout(() => {
        historyRef?.current?.scrollTo(0, historyRef.current.scrollHeight)
      })
    },
    [aliases]
  )

  useEffect(
    function applyPageEvents() {
      appliedPageEvents.forEach(({ command }, id) => {
        handleCommandRun(command, id)
      })
    },
    [appliedPageEvents, handleCommandRun]
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
    aliases,
    pageEvents,
    clearTerminal: () => setHistories([])
  }

  const consoleStyles = {
    paddingTop: parseInt(titleReference.current?.offsetHeight || 0) + 10,
    paddingBottom: parseInt(inputReference.current?.offsetHeight || 0) + 10
  }

  return (
    <ConsoleWrapper
      ref={wrapperReference}
      isOpen={isOpen}
      style={resizeData}
      ondragstart='return false;'
      ondrop='return false;'
      onClick={() => inputReference.current?.focus()}
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
