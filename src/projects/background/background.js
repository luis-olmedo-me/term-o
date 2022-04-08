import { configManager } from 'libs/config-manager'

import { eventTypes } from 'src/constants/events.constants.js'

import { debounce } from 'src/helpers/utils.helpers.js'

class ConnectedTabs {
  constructor() {
    this.list = []

    chrome.tabs.onRemoved.addListener(this.removeIdFromList.bind(this))
    chrome.tabs.onUpdated.addListener(this.removeReloadedTabs.bind(this))
  }

  addIdToList(id) {
    this.list = this.list.includes(id) ? this.list : [...this.list, id]
  }

  removeIdFromList(id) {
    this.list = this.list.filter((item) => item !== id)
  }

  removeReloadedTabs(id, { status }) {
    if (status !== 'loading') return

    this.removeIdFromList(id)
  }
}

export const connectedTabs = new ConnectedTabs()

chrome.commands.onCommand.addListener(function (command) {
  const requestData = {
    action: eventTypes.NEW_COMMAND,
    data: { command }
  }

  chrome.tabs.query({ active: true }, function (tabs) {
    const tab = tabs[0]
    const { id } = tab

    if (connectedTabs.list.includes(id)) {
      chrome.tabs.sendMessage(id, requestData)
    }
  })
})

configManager.onChange = debounce((sender, shouldUpdateCurrentTab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const [currentTab] = tabs
    const shouldUpdate =
      shouldUpdateCurrentTab && currentTab.id === sender?.tab?.id

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
    case eventTypes.SET_UP_CONNECTION: {
      connectedTabs.addIdToList(sender.tab.id)
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.GET_CONFIGURATION: {
      sendResponse({ status: 'ok', response: configManager.config })
      break
    }

    case eventTypes.RESET_CONFIGURATION:
      configManager.reset(sender)
      sendResponse({ status: 'ok' })
      break

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
      const initialId = Date.now().toString()
      const newAliases = request.data.map((newAlias, index) => ({
        ...newAlias,
        id: initialId + index
      }))

      const newData = [...configManager.aliases, ...newAliases]

      configManager.setConfig({ aliases: newData }, sender)
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.DELETE_ALIAS: {
      const aliasIdsToDelete = request.data?.aliasIdsToDelete || []

      const newAliases = configManager.aliases.filter(
        ({ id }) => !aliasIdsToDelete.includes(id)
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
  }
})
