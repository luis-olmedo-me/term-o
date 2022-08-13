import { useEffect, useState, useCallback } from 'react'

import { commander } from 'libs/commander/commander.service'

import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { appRoot } from '../../../content.constants'

const defaultConfiguration = {
  isOpen: false,
  appliedPageEvents: [],
  consolePosition: {}
}

export const useConfig = () => {
  const [config, setConfig] = useState(defaultConfiguration)

  useEffect(function checkConsoleToggle() {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === 'attributes') {
          setConfig((oldConfig) => ({
            ...oldConfig,
            isOpen: appRoot.dataset.isOpen === 'true'
          }))
        }
      })
    })

    observer.observe(appRoot, { attributes: true })

    return () => observer.disconnect()
  })

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
