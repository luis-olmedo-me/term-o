import { removeDuplicatedFromArray } from '@helpers/utils.helpers'
import { processWaitList } from '@libs/process-wait-list/processWaitList.service'
import {
  eventTypes,
  extensionKeyEventNames,
  extensionKeyEvents
} from '@src/constants/events.constants.js'
import { invalidURLsStarts } from './background.constants'
import { resizeFull, resizeLeft, resizeRight, toggleTerminal } from './background.helpers'
import {
  createCloseTabsProcess,
  createHistoryProcess,
  createTabsOpenProcess,
  createUpdateTabProccess,
  createUpdateWindowProccess
} from './background.processes'

chrome.commands.onCommand.addListener(function(command) {
  if (!extensionKeyEventNames.includes(command)) return

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const [{ id, url }] = tabs
    const isInvalidUrl = invalidURLsStarts.some(invalidUrl => url.startsWith(invalidUrl))

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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
    case eventTypes.CLOSE_OPEN_TABS: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add(resolve => createCloseTabsProcess(resolve, data))

      sendResponse({ status: 'ok', data: process })
      break
    }

    case eventTypes.GET_TABS_OPEN: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add(resolve => createTabsOpenProcess(resolve, data))

      sendResponse({ status: 'ok', data: process })
      break
    }

    case eventTypes.GET_TABS_INFO: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add(resolve => createGetTabsInfoProccess(resolve, data))

      sendResponse({ status: 'ok', data: process })
      break
    }

    case eventTypes.GET_HISTORIAL: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add(resolve => createHistoryProcess(resolve, data))

      sendResponse({ status: 'ok', data: process })
      break
    }

    case eventTypes.UPDATE_WINDOW: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add(resolve => createUpdateWindowProccess(resolve, data))

      sendResponse({ status: 'ok', data: process })
      break
    }

    case eventTypes.UPDATE_TAB: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add(resolve => createUpdateTabProccess(resolve, data))

      sendResponse({ status: 'ok', data: process })
      break
    }

    case eventTypes.AUTOMATIC_CLOSE_TABS: {
      const tabIds = request.data
      tabAutomaticCloser.addTabs(tabIds)

      sendResponse({ status: 'ok', data: null })
      break
    }

    case eventTypes.CANCEL_AUTOMATIC_CLOSE_TABS: {
      const tabIds = request.data
      tabAutomaticCloser.removeTabs(tabIds)

      sendResponse({ status: 'ok', data: null })
      break
    }
  }
})

class TabAutomaticCloser {
  constructor() {
    this.bannedTabIds = []

    chrome.tabs.onCreated.addListener(this.onTabCreation.bind(this))
  }

  onTabCreation(tab) {
    if (this.bannedTabIds.includes(tab.openerTabId)) chrome.tabs.remove(tab.id)
  }

  addTabs(tabIds) {
    const newBannedTabIds = [...this.bannedTabIds, ...tabIds]

    this.bannedTabIds = removeDuplicatedFromArray(newBannedTabIds)
  }

  removeTabs(tabIds) {
    this.bannedTabIds = this.bannedTabIds.filter(id => tabIds.includes(id))
  }
}

const tabAutomaticCloser = new TabAutomaticCloser()
