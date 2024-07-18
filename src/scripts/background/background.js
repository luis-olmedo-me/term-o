import commandHandlers, { getCurrentTab } from '@background/command-handlers'
import commandParser from '@src/libs/command-parser'

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

commandParser.setHandlers(commandHandlers)

let userEvents = []

const getUserEventsFromLS = async () => {
  const { events = [] } = await chrome.storage.local.get('events')

  userEvents = events
}
const executeEvents = async events => {
  const tab = await getCurrentTab()

  events.forEach(event => {
    const command = commandParser.read(event.command)

    command.appendsData({ tab })

    command.execute()
  })
}

getUserEventsFromLS()

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') return

  const pendingEvents = userEvents.filter(event => new RegExp(event.url).test(tab.url))

  if (pendingEvents.length === 0) return

  executeEvents(pendingEvents)

  console.log(tab, tab, changeInfo)
})
