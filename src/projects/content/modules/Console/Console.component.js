import * as React from 'preact'
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'

import { commander } from '@libs/commander'

import { CommandInput } from './components/CommandInput/CommandInput.component.js'
import { Resizer } from './components/Resizer/Resizer.component.js'

import { resizeTypes, singleResizeTypes } from './hooks/useResize/useResize.constants.js'

import { useConfig } from './hooks/useConfig.hook.js'
import { useResize } from './hooks/useResize/useResize.hook.js'

import { useNotifications } from '@modules/components/Notifications/hooks/useNotifications.hook.js'
import { Notifications } from '@modules/components/Notifications/Notifications.component.js'
import { generateUUID } from 'helpers/utils.helpers.js'
import { ConsoleLogs, ConsoleTitle, ConsoleWrapper } from './Console.styles.js'

export const Console = () => {
  const wrapperReference = useRef(null)
  const titleReference = useRef(null)
  const inputReference = useRef(null)

  const [histories, setHistories] = useState([])
  const [hasPageEventsBeenRunned, setHasPageEventsBeenRunned] = useState(false)

  const { notifications, addNotification, showWorkerRequestError } = useNotifications()
  const { isOpen, appliedPageEvents, customPageEvents, consolePosition } = useConfig({
    onError: showWorkerRequestError
  })
  const { setResizingFrom, setMovingFrom, isMoving } = useResize({
    wrapperReference,
    consolePosition,
    onError: showWorkerRequestError,
    isEnabled: isOpen
  })

  const handleCommandRun = useCallback(command => {
    const formmatedCommand = commander.getCommandWithAliases(command)

    const logOutput = commander.getOutputsAsyncSecuence(generateUUID(), formmatedCommand)

    setHistories(histories => [...histories, logOutput])
  }, [])

  useEffect(
    function applyPageEvents() {
      if (hasPageEventsBeenRunned) return

      const asyncCommand = appliedPageEvents.map(({ command }) => command).join(' &&& ')
      if (asyncCommand) handleCommandRun(asyncCommand)

      if (appliedPageEvents.length) setHasPageEventsBeenRunned(true)
    },
    [appliedPageEvents, handleCommandRun, hasPageEventsBeenRunned]
  )

  useEffect(
    function setUpCustomEvents() {
      const customEventsWithCallbacks = customPageEvents.map(customEvent => {
        return {
          ...customEvent,
          callback: () => handleCommandRun(customEvent.command)
        }
      })

      customEventsWithCallbacks.forEach(customEvent => {
        window.addEventListener(customEvent.event, customEvent.callback)
      })

      return () => {
        customEventsWithCallbacks.forEach(customEvent => {
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

  const outsideProps = useMemo(
    () => ({
      clearTerminal,
      addNotification
    }),
    [clearTerminal, addNotification]
  )

  const consoleStyles = {
    paddingTop: parseInt(titleReference.current?.offsetHeight || 0) + 10,
    paddingBottom: parseInt(inputReference.current?.offsetHeight || 0) + 10
  }

  const cancelEventPropagation = event => {
    event.stopPropagation()
  }

  const movingEffect = isMoving ? { opacity: 0.3 } : {}

  return (
    <ConsoleWrapper
      ref={wrapperReference}
      isOpen={isOpen}
      style={movingEffect}
      ondragstart="return false;"
      ondrop="return false;"
      onMouseDown={() => setTimeout(() => inputReference.current?.focus())}
      onKeyDown={cancelEventPropagation}
      onKeyUp={cancelEventPropagation}
      onKeyPress={cancelEventPropagation}
    >
      {!isMoving
        ? singleResizeTypes.map(resizeType => (
            <Resizer key={resizeType} resizeType={resizeType} setResizingFrom={setResizingFrom} />
          ))
        : null}

      <ConsoleTitle
        ref={titleReference}
        onMouseDown={event => {
          setResizingFrom(resizeTypes.MOVING)
          setMovingFrom({ x: event.clientX, y: event.clientY })
        }}
      >
        TERM-O
      </ConsoleTitle>

      <ConsoleLogs style={consoleStyles}>
        {histories.map((History, index) => (
          <History key={index} outsideProps={outsideProps} />
        ))}
      </ConsoleLogs>

      <CommandInput
        inputReference={inputReference}
        handleOnEnter={command => handleCommandRun(command)}
      />

      <Notifications messages={notifications} />
    </ConsoleWrapper>
  )
}
