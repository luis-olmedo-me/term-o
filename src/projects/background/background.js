import { configManager } from 'libs/config-manager'

import {
  eventTypes,
  extensionKeyEvents
} from 'src/constants/events.constants.js'

const toggleTerminal = () => {
  const root = window.document.getElementById('term-o-root')

  if (!root) return

  const isInitiated = root.dataset.isInitiated === 'true'
  const isOpen = root.dataset.isOpen === 'true'

  if (isInitiated) {
    root.dataset.isOpen = !isOpen
  } else {
    const loadingNotification = new CustomEvent('term-o-notification', {
      detail: {
        id: Date.now().toString(),
        message: 'Please wait until TERM-O is properly loaded.'
      }
    })

    window.dispatchEvent(loadingNotification)
  }
}

chrome.commands.onCommand.addListener(function (command) {
  if (command !== extensionKeyEvents.TOGGLE_TERMINAL) return

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const [{ id }] = tabs

    chrome.scripting.executeScript({
      target: { tabId: id, allFrames: true },
      func: toggleTerminal
    })
  })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case eventTypes.GET_CONFIGURATION: {
      sendResponse({ status: 'ok', response: configManager.config })
      break
    }

    case eventTypes.RESET_CONFIGURATION:
      configManager.reset()
      sendResponse({ status: 'ok' })
      break

    case eventTypes.ADD_PAGES_EVENT: {
      const initialId = Date.now().toString()
      const newPageEvents = request.data.map((newEvent, index) => ({
        ...newEvent,
        id: initialId + index
      }))

      const newData = [...configManager.pageEvents, ...newPageEvents]

      configManager.setConfig({ pageEvents: newData })
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.DELETE_PAGES_EVENT: {
      const newData = configManager.pageEvents.filter(
        ({ id }) => !request.data.ids.includes(id)
      )

      configManager.setConfig({ pageEvents: newData })
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.ADD_ALIAS: {
      const initialId = Date.now().toString()
      const newAliases = request.data.map((newAlias, index) => ({
        ...newAlias,
        id: initialId + index
      }))

      const newData = [...configManager.aliases, ...newAliases]

      configManager.setConfig({ aliases: newData })
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.DELETE_ALIAS: {
      const aliasIdsToDelete = request.data?.aliasIdsToDelete || []

      const newAliases = configManager.aliases.filter(
        ({ id }) => !aliasIdsToDelete.includes(id)
      )

      configManager.setConfig({ aliases: newAliases })
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.UPDATE_CONFIG_CONSOLE_POSITION: {
      configManager.setConfig({ consolePosition: request.data })
      sendResponse({ status: 'ok' })
      break
    }
  }
})
