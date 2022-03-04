import { configManager } from 'libs/config-manager'

import { eventTypes } from 'src/constants/events.constants.js'

chrome.commands.onCommand.addListener(function (command) {
  const requestData = {
    action: eventTypes.NEW_COMMAND,
    data: { command }
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, requestData)
  })
})

chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
  switch (request.type) {
    case eventTypes.GET_PAGE_EVENTS: {
      sendResponse({ status: 'ok', response: configManager.pageEvents })
      break
    }

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

    case eventTypes.DELETE_PAGES_EVENT: {
      const newData = configManager.pageEvents.filter(
        ({ id }) => !request.data.ids.includes(id)
      )

      configManager.setPageEvents(newData)
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.GET_CONSOLE_POSITION: {
      sendResponse({ status: 'ok', response: configManager.consolePosition })
      break
    }

    case eventTypes.UPDATE_CONFIG_CONSOLE_POSITION: {
      configManager.setConsolePosition(request.data)

      sendResponse({ status: 'ok' })
      break
    }
  }
})
