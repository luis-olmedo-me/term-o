import React, { useEffect, useRef, useState } from 'react'

import { Console } from '../modules/Console/Console.component'

import {
  ContentWrapper,
  ResizerLeft,
  ResizerRight,
  ResizerTop,
  ResizerBottom
} from './Content.styles.js'
import {
  eventTypes,
  extensionKeyEvents
} from 'src/constants/events.constants.js'
import { useResize } from './hooks/useResize/useResize.hook'
import { resizeTypes } from './hooks/useResize/useResize.constants'

export const Content = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)
  const wrapperReference = useRef(null)
  const { setResizingFrom, resizeData, setMovingFrom, isMoving, bodyData } =
    useResize({
      wrapperReference
    })

  useEffect(function openConsoleByKeyCommands() {
    const toggleTerminal = (message, _sender, sendResponse) => {
      if (message.action !== eventTypes.NEW_COMMAND) return

      switch (message.data.command) {
        case extensionKeyEvents.TOGGLE_TERMINAL:
          setIsConsoleOpen((state) => !state)
          break
      }

      sendResponse({ status: 'ok' })
    }

    chrome.extension.onMessage.addListener(toggleTerminal)

    return () => chrome.extension.onMessage.removeListener(toggleTerminal)
  }, [])

  const resizeConsole = (newResizingFrom) => {
    setResizingFrom(newResizingFrom)
  }

  const stopResizeConsole = () => {
    setResizingFrom('')
  }

  return (
    <ContentWrapper
      ref={wrapperReference}
      opacity={isConsoleOpen ? 1 : 0}
      style={resizeData}
    >
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

      <Console
        isOpen={isConsoleOpen}
        totalHeight={bodyData.height - resizeData.top - resizeData.bottom}
        isMoving={isMoving}
        onTitleClick={(event) => {
          resizeConsole(resizeTypes.MOVING)
          setMovingFrom({ x: event.clientX, y: event.clientY })
        }}
        onTitleRelease={() => {
          stopResizeConsole()
          setMovingFrom(null)
        }}
      />
    </ContentWrapper>
  )
}
