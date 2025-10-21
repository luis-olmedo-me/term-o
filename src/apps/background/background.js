import commandParser from '@src/libs/command-parser'
import processWaitList from '@src/libs/process-wait-list'
import storage from '@src/libs/storage'
import processHandlers from './process-handlers'

import { getCurrentTab, getTab } from '@src/browser-api/tabs.api'
import { executionContexts } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { limitSimplifiedCommands } from '@src/helpers/command.helpers'
import { createContext } from '@src/helpers/contexts.helpers'

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

commandParser.setExecutionContext(executionContexts.BACKGROUND)

const executeEvents = async (events, defaultTab) => {
  let commands = []
  let previousTabId = storage.get(storageKeys.TAB_ID)

  storage.set(storageKeys.TAB_ID, defaultTab.id)

  for (let index = 0; index < events.length; index++) {
    const tabId = storage.get(storageKeys.TAB_ID)
    const aliases = storage.get(storageKeys.ALIASES)
    const config = storage.get(storageKeys.CONFIG)

    commandParser.setAliases(aliases)

    const contextInputValue = config.getValueById(configInputIds.CONTEXT)
    const tab = await getTab({ tabId })
    const event = events[index]

    const context = createContext(contextInputValue, tab)
    const command = commandParser.read(event.line).applyContext(context)

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
  storage.set(storageKeys.TAB_ID, previousTabId)
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

getCurrentTab().then(tab => storage.set(storageKeys.TAB_ID, tab.id))
