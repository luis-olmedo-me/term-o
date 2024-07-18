import commandHandlers from '@background/command-handlers'
import { getStorageValue } from '@background/command-handlers/storage/storage.helpers'
import commandParser from '@src/libs/command-parser'

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

commandParser.setHandlers(commandHandlers)

let userEvents = []

const handleStorageChanges = (changes, currentChanges) => {
  if (currentChanges !== 'local') return

  for (let [storageKey, { newValue }] of Object.entries(changes)) {
    if (storageKey === 'events') {
      userEvents = newValue
    }
  }
}
const getUserEventsFromLS = async () => {
  const events = await getStorageValue('local', 'events')

  userEvents = events || []
}

getUserEventsFromLS()
chrome.storage.onChanged.addListener(handleStorageChanges)

const executeEvents = async (events, data) => {
  events.forEach(event => {
    const command = commandParser.read(event.line)

    command.appendsData(data)
    if (!command.finished) command.execute()
  })
}

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, updatedTab) => {
  if (changeInfo.status !== 'complete') return

  const pendingEvents = userEvents.filter(event => new RegExp(event.url).test(updatedTab.url))

  if (pendingEvents.length === 0) return

  let tab = updatedTab
  const theme = {}
  const setTab = newTab => (tab = newTab)
  const clearLogs = () => {}

  executeEvents(pendingEvents, { tab, setTab, theme, clearLogs })
})
