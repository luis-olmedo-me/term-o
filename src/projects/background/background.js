import { configManager } from 'libs/config-manager'

import { eventTypes } from 'src/constants/events.constants.js'

import { debounce } from 'src/helpers/utils.helpers.js'

chrome.commands.onCommand.addListener(function (command) {
  const requestData = {
    action: eventTypes.NEW_COMMAND,
    data: { command }
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const [currentTab] = tabs

    if (currentTab) chrome.tabs.sendMessage(currentTab.id, requestData, null)
  })
})

configManager.onChange = debounce((sender, shouldUpdateCurrentTab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const [currentTab] = tabs
    const shouldUpdate =
      shouldUpdateCurrentTab && currentTab.id === sender.tab?.id

    const requestData = {
      action: eventTypes.CONFIG_UPDATE,
      data: configManager.config
    }

    if (currentTab && shouldUpdate) {
      chrome.tabs.sendMessage(currentTab.id, requestData, null)
    }
  })
}, 100)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case eventTypes.GET_CONFIGURATION: {
      sendResponse({ status: 'ok', response: configManager.config })
      break
    }

    case eventTypes.ADD_PAGES_EVENT: {
      const initialId = Date.now().toString()
      const newPageEvents = request.data.map((newEvent, index) => ({
        ...newEvent,
        id: initialId + index
      }))

      const newData = [...configManager.pageEvents, ...newPageEvents]

      configManager.setConfig({ pageEvents: newData }, sender)
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.DELETE_PAGES_EVENT: {
      const newData = configManager.pageEvents.filter(
        ({ id }) => !request.data.ids.includes(id)
      )

      configManager.setConfig({ pageEvents: newData }, sender)
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.ADD_ALIAS: {
      const newData = { ...configManager.aliases, ...request.data }

      configManager.setConfig({ aliases: newData }, sender)
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

      configManager.setConfig({ aliases: newAliases }, sender)
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.UPDATE_CONFIG_CONSOLE_POSITION: {
      configManager.setConfig({ consolePosition: request.data }, sender, false)
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.UPDATE_CONFIG: {
      configManager.setConfig(request.data, sender, false)
      sendResponse({ status: 'ok' })
      break
    }
  }
})
