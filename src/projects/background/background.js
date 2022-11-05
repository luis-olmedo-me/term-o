import { configManager } from 'libs/config-manager'
import { processWaitList } from 'libs/process-wait-list/processWaitList.service'

import {
  eventTypes,
  extensionKeyEventNames,
  extensionKeyEvents
} from 'src/constants/events.constants.js'
import { invalidURLsStarts } from './background.constants'
import {
  mergeAliases,
  resizeFull,
  resizeLeft,
  resizeRight,
  toggleTerminal
} from './background.helpers'
import {
  createCloseTabsProcess,
  createHistoryProcess,
  createTabsOpenProcess
} from './background.processes'

chrome.commands.onCommand.addListener(function (command) {
  if (!extensionKeyEventNames.includes(command)) return

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const [{ id, url }] = tabs
    const isInvalidUrl = invalidURLsStarts.some((invalidUrl) =>
      url.startsWith(invalidUrl)
    )

    if (isInvalidUrl) return

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
      const newData = [configManager.pageEvents, request.data]

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
      const newData = mergeAliases(configManager.aliases, request.data)

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

    case eventTypes.CLOSE_OPEN_TABS: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add((resolve) =>
            createCloseTabsProcess(resolve, data)
          )

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
