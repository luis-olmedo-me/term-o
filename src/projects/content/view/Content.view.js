import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Console } from '../modules/Console/Console.component'

import { ContentWrapper, ResizerLeft } from './Content.styles.js'
import {
  eventTypes,
  extensionKeyEvents
} from 'src/constants/events.constants.js'
import { useResize } from './hooks/useResize/useResize.hook'
import { resizeTypes } from './hooks/useResize/useResize.constants'

export const Content = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)
  const wrapperReference = useRef(null)
  const [isResizing, setIsResizing] = useState(false)
  const [resizingFrom, setResizingFrom] = useState('')
  const [resizeData, setResizeData] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  })

  const isContentActive = isConsoleOpen

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

  useEffect(
    function setUpResizeEvent() {
      if (!isResizing) return

      const mouseHandler = (event) => {
        let newResizeData = {}

        switch (resizingFrom) {
          case 'left':
            const wrapperOffsetLeft = wrapperReference.current.offsetLeft
            const newDistance = event.clientX - wrapperOffsetLeft
            newResizeData = { left: newDistance + wrapperOffsetLeft }
            console.log('newDistance', newDistance)
            console.log('wrapperOffsetLeft', wrapperOffsetLeft)
            console.log('newResizeData.left', newResizeData.left)
            break
        }

        setResizeData((oldResizeData) => ({
          ...oldResizeData,
          ...newResizeData
        }))
      }

      addEventListener('mousemove', mouseHandler)

      return () => removeEventListener('mousemove', mouseHandler)
    },
    [isResizing]
  )

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
      opacity={isContentActive ? 1 : 0}
      {...resizeData}
    >
      <ResizerLeft
        onMouseDown={() => resizeConsole('left')}
        onMouseUp={stopResizeConsole}
      />
      <Console isOpen={isConsoleOpen} />
    </ContentWrapper>
  )
}
