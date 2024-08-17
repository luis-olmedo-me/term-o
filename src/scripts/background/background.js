import commandParser from '@src/libs/command-parser'
import processWaitList from '@src/libs/process-wait-list'
import eventManager from './packages/event-manager.package'
import processes from './processes'

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { id, data } = request.data
  const handler = processes[request.type]

  const process = id
    ? processWaitList.getProcessById(id)
    : processWaitList.add(resolve => handler(resolve, data))

  return sendResponse({ status: 'ok', data: process })
})
