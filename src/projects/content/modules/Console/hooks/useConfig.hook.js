import { useEffect, useState } from 'preact/hooks'

import { commander, customPageEventNames } from 'libs/commander'

import { fetchConfiguration } from 'src/helpers/event.helpers.js'

const defaultConfiguration = {
  isOpen: false,
  appliedPageEvents: [],
  customPageEvents: [],
  consolePosition: {}
}

export const useConfig = ({ onError }) => {
  const [config, setConfig] = useState(defaultConfiguration)

  useEffect(function checkConsoleToggle() {
    const toggleConsoleState = () => {
      setConfig(oldConfig => ({ ...oldConfig, isOpen: !oldConfig.isOpen }))
    }

    window.addEventListener('term-o-toggle-console', toggleConsoleState)

    return () => {
      window.removeEventListener('term-o-toggle-console', toggleConsoleState)
    }
  }, [])

  useEffect(function getConfiguration() {
    const receiveConfiguration = ({ pageEvents, aliases, consolePosition }) => {
      const updatedPageEvents = pageEvents.filter(
        ({ url, event }) =>
          new RegExp(url).test(window.location.href) && !customPageEventNames.includes(event)
      )
      const customEvents = pageEvents.filter(({ event }) => customPageEventNames.includes(event))

      setConfig(oldConfig => ({
        ...oldConfig,
        appliedPageEvents: updatedPageEvents,
        customPageEvents: customEvents,
        consolePosition: consolePosition
      }))

      commander.setAliases(aliases)
    }

    chrome.storage.onChanged.addListener(function(changes, namespace) {
      const isLocal = namespace === 'local'

      if (isLocal && changes.aliases) {
        commander.setAliases(changes.aliases.newValue)
      }
    })

    fetchConfiguration()
      .then(receiveConfiguration)
      .catch(onError)
  }, [])

  return config
}
