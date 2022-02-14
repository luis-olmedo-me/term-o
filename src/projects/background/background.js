import broker from 'libs/easy-broker'
import { NEW_COMMAND } from 'libs/easy-key-manager'

chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({ active: true }, ([{ id }]) => {
    broker.send(NEW_COMMAND, { command }, null, id)
  })
})

const pageEvents = [
  {
    url: 'https://www.google.com',
    command: 'dom -g a | css --background red'
  },
  {
    url: 'https://www.google.com',
    command: 'dom -g a | css --color violet'
  }
]

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'term-o-add-page-event') {
    pageEvents.push(request.data)

    sendResponse({ status: 'ok' })
  } else if (request.type === 'term-o-get-page-events') {
    sendResponse({ status: 'ok', response: pageEvents })
  }
})
