import { configManager } from 'libs/config-manager'

import { eventTypes } from 'src/constants/events.constants.js'

chrome.commands.onCommand.addListener(function (command) {
  const requestData = {
    action: eventTypes.NEW_COMMAND,
    data: { command }
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const [currentTab] = tabs

    if (currentTab) chrome.tabs.sendMessage(currentTab.id, requestData)
  })
})

configManager.onChange = () => {
  const requestData = {
    action: eventTypes.UPDATE_CONFIG,
    data: configManager.getConfiguration()
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const [currentTab] = tabs

    if (currentTab) chrome.tabs.sendMessage(currentTab.id, requestData)
  })
}

chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
  switch (request.type) {
    case eventTypes.GET_CONFIGURATION: {
      sendResponse({ status: 'ok', response: configManager.getConfiguration() })
      break
    }

    case eventTypes.ADD_PAGES_EVENT: {
      const initialId = Date.now().toString()
      const newPageEvents = request.data.map((newEvent, index) => ({
        ...newEvent,
        id: initialId + index
      }))

      const newData = [...configManager.pageEvents, ...newPageEvents]

      configManager.setPageEvents(newData)
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.ADD_ALIAS: {
      configManager.setAliases({ ...configManager.aliases, ...request.data })
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.DELETE_ALIAS: {
      const aliasesKeysToDelete = request.data?.aliasesKeysToDelete || []

      const newAliases = aliasesKeysToDelete.reduce(
        (filteredAliases, aliasKeyToDelete) => {
          const { [aliasKeyToDelete]: removed, ...aliases } = filteredAliases

          return aliases
        },
        configManager.aliases
      )

      configManager.setAliases(newAliases)
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.DELETE_PAGES_EVENT: {
      const newData = configManager.pageEvents.filter(
        ({ id }) => !request.data.ids.includes(id)
      )

      configManager.setPageEvents(newData)
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.UPDATE_CONFIG_CONSOLE_POSITION: {
      configManager.setConsolePosition(request.data)

      sendResponse({ status: 'ok' })
      break
    }
  }
})
