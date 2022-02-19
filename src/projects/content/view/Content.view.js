import React, { useCallback, useEffect, useRef, useState } from 'react'

import { EASY_DOM_CONTENT_WRAPPER_ID } from 'projects/content/content.constants'
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
import { useResize } from './hooks/useResize.hook'

export const Content = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)
  const wrapperReference = useRef(null)
  const { setIsResizing, setResizingFrom, resizeData } = useResize({
    wrapperReference
  })

  useEffect(function openConsoleByKeyCommands() {
    const toggleTerminal = (message, sender, sendResponse) => {
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
    setIsResizing(true)
  }

  const stopResizeConsole = () => {
    setIsResizing(false)
  }

  return (
    <ContentWrapper
      ref={wrapperReference}
      opacity={isConsoleOpen ? 1 : 0}
      {...resizeData}
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

      <Console isOpen={isConsoleOpen} />
    </ContentWrapper>
  )
}
