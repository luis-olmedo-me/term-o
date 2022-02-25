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

const bodyHeight = Math.min(document.body.clientHeight, window.innerHeight - 1)

export const Content = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)
  const wrapperReference = useRef(null)
  const { setResizingFrom, resizeData, setMovingFrom } = useResize({
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
        onMouseDown={() => resizeConsole('left')}
        onMouseUp={stopResizeConsole}
      />

      <ResizerRight
        onMouseDown={() => resizeConsole('right')}
        onMouseUp={stopResizeConsole}
      />
      <ResizerTop
        onMouseDown={() => resizeConsole('top')}
        onMouseUp={stopResizeConsole}
      />
      <ResizerBottom
        onMouseDown={() => resizeConsole('bottom')}
        onMouseUp={stopResizeConsole}
      />

      <Console
        isOpen={isConsoleOpen}
        totalHeight={bodyHeight - resizeData.top - resizeData.bottom}
        onTitleClick={(event) => {
          resizeConsole('moving')
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
