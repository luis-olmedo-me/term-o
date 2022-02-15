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

    case eventTypes.ADD_PAGE_EVENT: {
      const newData = { pageEvents: [...pageEvents, request.data] }

      setPageEvents(newData)
      updatePageEvents()
      sendResponse({ status: 'ok' })
      break
    }
  }
})

updatePageEvents()
