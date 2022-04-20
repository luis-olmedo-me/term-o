import { useEffect, useState, useCallback } from 'react'

import { commander } from 'libs/commander/commander.service'

import {
  backgroundRequest,
  onLocationChange
} from 'src/helpers/event.helpers.js'
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

  const handleBackgroundMessage = useCallback(
    (message, _sender, sendResponse) => {
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
    },
    []
  )

  useEffect(
    function setUpConnectionWithBackgroundScript() {
      const requestDataForSetUp = { eventType: eventTypes.SET_UP_CONNECTION }
      const requestDataForRemove = {
        eventType: eventTypes.REMOVE_CONNECTION,
        callback: null
      }

      const setUpConnection = () => {
        backgroundRequest(requestDataForSetUp)
        chrome.runtime.onMessage.addListener(handleBackgroundMessage)
      }
      const removeConnection = () => {
        backgroundRequest(requestDataForRemove)
        chrome.runtime.onMessage.removeListener(handleBackgroundMessage)
      }

      setUpConnection()

      window.addEventListener('beforeunload', removeConnection, false)
      window.addEventListener('load', setUpConnection, false)
    },
    [handleBackgroundMessage]
  )

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
