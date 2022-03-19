import { useEffect, useState } from 'react'

import { commander } from 'libs/easy-commander/easyCommander.service'

import { backgroundRequest } from 'src/helpers/event.helpers.js'
import {
  eventTypes,
  extensionKeyEvents
} from 'src/constants/events.constants.js'

const defaultConfiguration = {
  isOpen: false,
  appliedPageEvents: [],
  consolePosition: {}
}

export const useConfig = () => {
  const [config, setConfig] = useState(defaultConfiguration)

  useEffect(function openConsoleByKeyCommands() {
    const toggleTerminal = (message, _sender, sendResponse) => {
      const isActionNewCommand = message.action === eventTypes.NEW_COMMAND
      const isCommandToggleTerminal =
        message.data.command === extensionKeyEvents.TOGGLE_TERMINAL

      if (isActionNewCommand && isCommandToggleTerminal) {
        setConfig((oldConfig) => ({
          ...oldConfig,
          isOpen: !oldConfig.isOpen
        }))
      }

      sendResponse({ status: 'ok' })
    }

    chrome.runtime.onMessage.addListener(toggleTerminal)

    return () => chrome.runtime.onMessage.removeListener(toggleTerminal)
  }, [])

  useEffect(function expectForConfigChanges() {
    const receiveConfiguration = (message, _sender, sendResponse) => {
      if (message.action === eventTypes.CONFIG_UPDATE) {
        commander.setAliases(message.data?.aliases)
      }

      sendResponse({ status: 'ok' })
    }

    chrome.runtime.onMessage.addListener(receiveConfiguration)

    return () => chrome.runtime.onMessage.removeListener(receiveConfiguration)
  }, [])

  useEffect(function getConfiguration() {
    const receiveConfiguration = ({ response: newConfig }) => {
      if (!newConfig) return

      const updatedPageEvents = newConfig?.pageEvents?.filter((pageEvent) =>
        window.location.origin.match(new RegExp(pageEvent.url))
      )

      setConfig((oldConfig) => ({
        ...oldConfig,
        appliedPageEvents: updatedPageEvents || [],
        consolePosition: newConfig?.consolePosition || {}
      }))

      commander.setAliases(newConfig?.aliases)
    }

    backgroundRequest({
      eventType: eventTypes.GET_CONFIGURATION,
      callback: receiveConfiguration
    })
  }, [])

  return config
}
