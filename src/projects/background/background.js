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
  createGetTabsInfoProccess,
  createHistoryProcess,
  createTabsOpenProcess,
  createUpdateTabProccess
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

    case eventTypes.GET_TABS_INFO: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add(resolve => createGetTabsInfoProccess(resolve, data))

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

    case eventTypes.GET_HISTORIAL: {
      const { id, data } = request.data

      const process = id
        ? processWaitList.getProcessById(id)
        : processWaitList.add(resolve => createHistoryProcess(resolve, data))

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
  }
})
