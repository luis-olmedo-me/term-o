import commandParser, { executionContexts, limitSimplifiedCommands } from '@src/libs/command-parser'
import processWaitList from '@src/libs/process-wait-list'
import eventManager from './packages/event-manager.package'
import historyManager from './packages/history-manager.package'
import processHandlers from './process-handlers'

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

commandParser.setExecutionContext(executionContexts.BACKGROUND)

const executeEvents = async (events, defaultTab) => {
  let commands = []
  let tab = defaultTab
  const setTab = newTab => (tab = newTab)
  const clearLogs = () => historyManager.setHistory([])

  for (let index = 0; index < events.length; index++) {
    const event = events[index]
    const command = commandParser.read(event.line)
    const context = historyManager.getContext(tab)

    command.applyData({ tab, setTab, clearLogs }).setContext(context)
    if (!command.finished) await command.execute()

    const commandVisible = command.getCommandVisibleInChain()

    if (commandVisible) {
      commands = [...commands, commandVisible.simplify()]
    }
  }

  const newCommands = [...historyManager.getHistory(), ...commands]
  const commandsLimited = limitSimplifiedCommands(newCommands, historyManager.getMaxLines())

  historyManager.setHistory(commandsLimited)
}

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, updatedTab) => {
  if (changeInfo.status !== 'complete') return

  const events = eventManager.getEvents()
  const pendingEvents = events.filter(event => new RegExp(event.url).test(updatedTab.url))

  if (pendingEvents.length === 0) return

  executeEvents(pendingEvents, updatedTab)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { id, data } = request.data
  const handler = processHandlers[request.type]

  if (handler) {
    const process = id
      ? processWaitList.getProcessById(id)
      : processWaitList.add(resolve => handler(resolve, data))

    return sendResponse({ status: 'ok', data: process })
  }
})
