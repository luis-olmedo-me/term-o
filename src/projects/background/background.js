import broker from 'libs/easy-broker'
import { NEW_COMMAND } from 'libs/easy-key-manager'

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
  if (request.type === 'term-o-add-page-event') {
    const newData = { pageEvents: [...pageEvents, request.data] }

    setPageEvents(newData)
    updatePageEvents()
    sendResponse({ status: 'ok' })
  } else if (request.type === 'term-o-get-page-events') {
    sendResponse({ status: 'ok', response: pageEvents })
  }
})

updatePageEvents()
