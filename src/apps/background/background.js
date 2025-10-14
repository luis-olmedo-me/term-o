import { executionContexts } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { limitSimplifiedCommands } from '@src/helpers/command.helpers'
import { createContext } from '@src/helpers/contexts.helpers'
import commandParser from '@src/libs/command-parser'
import processWaitList from '@src/libs/process-wait-list'
import storage from '@src/libs/storage'
import processHandlers from './process-handlers'

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

commandParser.setExecutionContext(executionContexts.BACKGROUND)

const executeEvents = async (events, defaultTab) => {
  let commands = []
  let tab = defaultTab
  const setTab = newTab => (tab = newTab)
  const clearLogs = () => storage.set(storageKeys.HISTORY, [])

  for (let index = 0; index < events.length; index++) {
    const aliases = storage.get(storageKeys.ALIASES)
    commandParser.setAliases(aliases)

    const config = storage.get(storageKeys.CONFIG)
    const contextInputValue = config.getValueById(configInputIds.CONTEXT)

    const event = events[index]
    const context = createContext(contextInputValue, tab)
    const command = commandParser
      .read(event.line)
      .applyData({ tab, setTab, clearLogs })
      .applyContext(context)

    if (!command.finished) await command.execute()

    const commandVisible = command.getCommandVisibleInChain()

    if (commandVisible) {
      commands = [...commands, commandVisible.simplify()]
    }
  }

  const config = storage.get(storageKeys.CONFIG)
  const oldCommands = storage.get(storageKeys.HISTORY)
  const maxLinesInputValue = config.getValueById(configInputIds.MAX_LINES_PER_COMMAND)

  const newCommands = [...oldCommands, ...commands]
  const commandsLimited = limitSimplifiedCommands(newCommands, maxLinesInputValue)

  storage.set(storageKeys.HISTORY, commandsLimited)
}

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, updatedTab) => {
  if (changeInfo.status !== 'complete') return

  const pendingEvents = storage
    .get(storageKeys.EVENTS)
    .filter(event => new RegExp(event.url).test(updatedTab.url))

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
