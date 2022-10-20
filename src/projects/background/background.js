import { configManager } from 'libs/config-manager'
import { processWaitList } from 'libs/process-wait-list/processWaitList.service'

import {
  eventTypes,
  extensionKeyEventNames,
  extensionKeyEvents
} from 'src/constants/events.constants.js'
import {
  resizeFull,
  resizeLeft,
  resizeRight,
  toggleTerminal
} from './background.helpers'

chrome.commands.onCommand.addListener(function (command) {
  if (!extensionKeyEventNames.includes(command)) return

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const [{ id }] = tabs

    if (command === extensionKeyEvents.TOGGLE_TERMINAL) {
      chrome.scripting.executeScript({
        target: { tabId: id, allFrames: true },
        func: toggleTerminal
      })
    }

    if (command === extensionKeyEvents.RESIZE_RIGHT) {
      chrome.scripting.executeScript({
        target: { tabId: id, allFrames: true },
        func: resizeRight
      })
    }

    if (command === extensionKeyEvents.RESIZE_LEFT) {
      chrome.scripting.executeScript({
        target: { tabId: id, allFrames: true },
        func: resizeLeft
      })
    }

    if (command === extensionKeyEvents.RESIZE_FULL) {
      chrome.scripting.executeScript({
        target: { tabId: id, allFrames: true },
        func: resizeFull
      })
    }
  })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case eventTypes.GET_CONFIGURATION: {
      sendResponse({ status: 'ok', data: configManager.config })
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

    case eventTypes.DELETE_OPEN_TABS: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add((resolve) => createKillTabsProcess(resolve, data))

      sendResponse({ status: 'ok', data: process })
      break
    }

    case eventTypes.GET_TABS_OPEN: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add((resolve) => createTabsOpenProcess(resolve, data))

      sendResponse({ status: 'ok', data: process })
      break
    }

    case eventTypes.GET_HISTORIAL: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add((resolve) => createHistoryProcess(resolve, data))

      sendResponse({ status: 'ok', data: process })
      break
    }
  }
})

const createKillTabsProcess = (resolve, tabIds) => {
  chrome.tabs.remove(tabIds, (...params) => {
    console.log('remove', params)
    resolve()
  })
}

const createHistoryProcess = (resolve, data) => {
  chrome.history.search(data, (historial) => {
    const filteredHistory = historial.map(
      ({ lastVisitTime, url, title, id }) => {
        return { date: lastVisitTime, url, title, id }
      }
    )

    resolve(filteredHistory)
  })
}

const createTabsOpenProcess = (resolve, data) => {
  const { text, incognito: filterIncognitos, ...options } = data

  chrome.tabs.query(options, function (tabs) {
    const filteredTabs = tabs.reduce(
      (finalTabs, { favIconUrl, title, url, id, incognito }) => {
        const titleLower = title.toLowerCase()
        const urlLower = url.toLowerCase()

        const matchText = urlLower.includes(text) || titleLower.includes(text)
        const isFilteredByIncognito = filterIncognitos ? incognito : true

        return (matchText || !text) && isFilteredByIncognito
          ? finalTabs.concat({
              favIconUrl,
              title,
              url,
              id,
              date: 'Now'
            })
          : finalTabs
      },
      []
    )

    resolve(filteredTabs)
  })
}
