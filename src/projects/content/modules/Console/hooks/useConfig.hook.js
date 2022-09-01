import { useEffect, useState } from 'react'

import { commander, customPageEventNames } from 'libs/commander'

import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { appRoot } from '../../../content.constants'

const defaultConfiguration = {
  isOpen: false,
  appliedPageEvents: [],
  customPageEvents: [],
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

    appRoot.dataset.isInitiated = 'true'

    observer.observe(appRoot, { attributes: true })

    return () => {
      appRoot.dataset.isInitiated = 'false'

      observer.disconnect()
    }
  })

  useEffect(function getConfiguration() {
    const receiveConfiguration = ({ response: newConfig }) => {
      if (!newConfig) return

      const updatedPageEvents = newConfig?.pageEvents?.filter(
        ({ url, event }) =>
          window.location.origin.match(new RegExp(url)) &&
          !customPageEventNames.includes(event)
      )
      const customEvents = newConfig?.pageEvents?.filter(({ event }) =>
        customPageEventNames.includes(event)
      )

      setConfig((oldConfig) => ({
        ...oldConfig,
        appliedPageEvents: updatedPageEvents || [],
        customPageEvents: customEvents || [],
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
