import { configManager } from 'libs/config-manager'

import {
  eventTypes,
  extensionKeyEvents,
  extensionKeyEventNames
} from 'src/constants/events.constants.js'
import { connectedTabs } from '../../libs/connected-tabs/connectedTabs.service'
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

    case eventTypes.GET_TABS_INFO: {
      configManager.setConfig({ consolePosition: request.data })
      sendResponse({ status: 'ok', data: connectedTabs.list })
      break
    }

    case eventTypes.GET_HISTORIAL: {
      const id = request.data

      const process = id
        ? waitList.getProcessById(id)
        : waitList.add(createHistoryProcess)

      sendResponse({ status: 'ok', data: process })
      break
    }
  }
})

const createHistoryProcess = (resolve) => {
  chrome.history.search({ text: '' }, (historial) => resolve(historial))
}

class WaitList {
  constructor() {
    this.list = []
  }

  getProcessById(id) {
    const process = this.list.find((process) => process.id === id)

    if (process?.state === 'done') this.remove(id)

    return process
  }

  resolver(id) {
    return (data) => {
      this.list = this.list.map((process) => {
        return process.id === id ? { ...process, state: 'done', data } : process
      })
    }
  }

  add(callback) {
    const newId = Date.now().toString()
    const newProcess = { id: newId, state: 'in_progress', data: null }
    const resolve = this.resolver(newId).bind(this)

    this.list = [...this.list, newProcess]
    callback(resolve)

    return newProcess
  }

  remove(id) {
    this.list = this.list.filter((process) => process.id !== id)
  }
}

const waitList = new WaitList()
