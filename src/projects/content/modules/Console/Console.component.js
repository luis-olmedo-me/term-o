import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { commander } from 'libs/commander/commander.service'

import { CommandInput } from './components/CommandInput/CommandInput.component.js'
import { Resizer } from './components/Resizer/Resizer.component.js'

import {
  resizeTypes,
  singleResizeTypes
} from './hooks/useResize/useResize.constants.js'

import { useConfig } from './hooks/useConfig.hook.js'
import { useResize } from './hooks/useResize/useResize.hook.js'

import { ConsoleTitle, ConsoleLogs, ConsoleWrapper } from './Console.styles.js'
import { Notifications } from 'src/modules/components/Notifications/Notifications.component.js'
import { useNotifications } from 'src/modules/components/Notifications/hooks/useNotifications.hook.js'

export const Console = () => {
  const wrapperReference = useRef(null)
  const titleReference = useRef(null)
  const inputReference = useRef(null)

  const [histories, setHistories] = useState([])
  const [hasPageEventsBeenRunned, setHasPageEventsBeenRunned] = useState(false)

  const { notifications, addNotification, showWorkerRequestError } =
    useNotifications()
  const { isOpen, appliedPageEvents, customPageEvents, consolePosition } =
    useConfig({ onError: showWorkerRequestError })
  const { setResizingFrom, resizeData, setMovingFrom, isMoving } = useResize({
    wrapperReference,
    consolePosition,
    onError: showWorkerRequestError
  })

  const handleCommandRun = useCallback((command, id) => {
    const formmatedCommand = commander.getCommandWithAliases(command)

    const logOutput = commander.getLogOutput(id, formmatedCommand)

    setHistories((histories) => [...histories, logOutput])
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
    function setUpCustomEvents() {
      const customEventsWithCallbacks = customPageEvents.map((customEvent) => {
        return {
          ...customEvent,
          callback: () => {
            const id = Date.now().toString()

            handleCommandRun(customEvent.command, id)
          }
        }
      })

      customEventsWithCallbacks.forEach((customEvent) => {
        window.addEventListener(customEvent.event, customEvent.callback)
      })

      return () => {
        customEventsWithCallbacks.forEach((customEvent) => {
          window.removeEventListener(customEvent.event, customEvent.callback)
        })
      }
    },
    [handleCommandRun, customPageEvents]
  )

  useEffect(
    function focusOnInputWhenConsoleIsOpen() {
      if (isOpen) {
        inputReference.current?.focus()
      }
    },
    [isOpen]
  )

  const clearTerminal = useCallback(() => {
    setHistories([])
  }, [])

  const outsideProps = {
    clearTerminal,
    addNotification
  }

  const consoleStyles = {
    paddingTop: parseInt(titleReference.current?.offsetHeight || 0) + 10,
    paddingBottom: parseInt(inputReference.current?.offsetHeight || 0) + 10
  }

  const cancelEventPropagation = (event) => {
    event.stopPropagation()
  }

  const movingEffect = isMoving ? { opacity: 0.3 } : {}

  return (
    <ConsoleWrapper
      ref={wrapperReference}
      isOpen={isOpen}
      style={{ ...resizeData, ...movingEffect }}
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

      <ConsoleLogs style={consoleStyles}>
        {histories.map((history) => history(outsideProps))}
      </ConsoleLogs>

      <CommandInput
        inputReference={inputReference}
        handleOnEnter={(command) => handleCommandRun(command, histories.length)}
      />

      <Notifications messages={notifications} />
    </ConsoleWrapper>
  )
}
