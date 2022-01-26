import React, { useEffect, useState } from 'react'

import broker from 'libs/easy-broker'
import { keysManager, extensionKeyEvents } from 'libs/easy-key-manager'

import { EASY_DOM_CONTENT_WRAPPER_ID } from 'projects/content/content.constants'
import { Console } from '../modules/Console/Console.component'

import { ContentWrapper } from './Content.styles.js'

keysManager.setConnectionProvider(broker).init()

export const Content = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)

  const isContentActive = isConsoleOpen

  useEffect(
    function updateTop() {
      if (isContentActive) {
        const handleMouseMove = () => {
          setIsConsoleOpen(false)
        }

        document.addEventListener('scroll', handleMouseMove)

        return () => document.removeEventListener('scroll', handleMouseMove)
      }
    },
    [isContentActive]
  )

  useEffect(function openConsoleByKeyCommands() {
    keysManager.onNewCommand((command) => {
      if (command === extensionKeyEvents.TOGGLE_TERMINAL) {
        setIsConsoleOpen((state) => !state)
      }
    })

    return () => {}
  }, [])

  return (
    <ContentWrapper
      id={EASY_DOM_CONTENT_WRAPPER_ID}
      top={isContentActive ? window.scrollY : 0}
      opacity={isContentActive ? 1 : 0}
    >
      <Console isOpen={isConsoleOpen} />
    </ContentWrapper>
  )
}
