import commandParser from '@src/libs/command-parser'
import handlers from '@src/libs/command-parser/handlers'
import eventManager from './packages/event-manager.package'

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

commandParser.setHandlers(handlers)

const executeEvents = async (events, data) => {
  events.forEach(event => {
    const command = commandParser.read(event.line)

    command.appendsData(data)
    if (!command.finished) command.execute()
  })
}

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, updatedTab) => {
  if (changeInfo.status !== 'complete') return

  const events = eventManager.getEvents()
  const pendingEvents = events.filter(event => new RegExp(event.url).test(updatedTab.url))

  if (pendingEvents.length === 0) return

  let tab = updatedTab
  const setTab = newTab => (tab = newTab)
  const clearLogs = () => {}

  executeEvents(pendingEvents, { tab, setTab, clearLogs })
})
