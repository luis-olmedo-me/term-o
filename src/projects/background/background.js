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

let configuration = {}

const updateConfiguration = () => {
  const receiveConfiguration = ({ configuration: receivedConfiguration }) => {
    configuration = receivedConfiguration || {}
  }

  chrome.storage.sync.get('configuration', receiveConfiguration)
}

const setConfiguration = (config) => {
  chrome.storage.sync.set({ configuration: config })
}

let pageEvents = []

const updatePageEvents = () => {
  const receivePageEvents = ({ pageEvents: pageEventsFromLocalStorage }) => {
    pageEvents = pageEventsFromLocalStorage || []
  }

  chrome.storage.sync.get('pageEvents', receivePageEvents)
}

const setPageEvents = (events) => {
  chrome.storage.sync.set({ pageEvents: events })
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case eventTypes.GET_PAGE_EVENTS: {
      sendResponse({ status: 'ok', response: pageEvents })
      break
    }

    case eventTypes.ADD_PAGES_EVENT: {
      const initialId = Date.now().toString()
      const newPageEvents = request.data.map((newEvent, index) => ({
        ...newEvent,
        id: initialId + index
      }))

      const newData = [...pageEvents, ...newPageEvents]

      setPageEvents(newData)
      updatePageEvents()
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.DELETE_PAGES_EVENT: {
      const newData = pageEvents.filter(
        ({ id }) => !request.data.ids.includes(id)
      )

      setPageEvents(newData)
      updatePageEvents()
      sendResponse({ status: 'ok' })
      break
    }

    case eventTypes.GET_CONFIGURATION: {
      sendResponse({ status: 'ok', response: configuration })
      break
    }

    case eventTypes.UPDATE_CONFIG_CONSOLE_POSITION: {
      const oldConsolePosition = configuration.consolePosition || {}

      setConfiguration({
        ...configuration,
        consolePosition: {
          ...oldConsolePosition,
          ...request.data
        }
      })
      updateConfiguration()
      sendResponse({ status: 'ok' })
      break
    }
  }
})

updatePageEvents()
updateConfiguration()
