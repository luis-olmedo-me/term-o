import broker from 'libs/easy-broker'
import { NEW_COMMAND } from 'libs/easy-key-manager'
import { eventTypes } from 'src/constants/events.constants.js'

chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({ active: true }, ([{ id }]) => {
    broker.send(NEW_COMMAND, { command }, null, id)
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
