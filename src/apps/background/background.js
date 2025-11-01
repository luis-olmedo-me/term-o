import commandParser from '@src/libs/command-parser'
import processWaitList from '@src/libs/process-wait-list'
import storage from '@src/libs/storage'

import { getCurrentTab, getTab } from '@src/browser-api/tabs.api'
import { origins } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
import processHandlers from './process-handlers'

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

const handleCommandQueueChange = async updatedStorage => {
  const queue = updatedStorage.get(storageKeys.COMMAND_QUEUE)
  const executable = queue.executable

  if (queue.isExecuting || !executable) return

  const originalTabId = storage.get(storageKeys.TAB_ID)
  const tabId = executable.tabId || storage.get(storageKeys.TAB_ID)
  const aliases = storage.get(storageKeys.ALIASES)
  const config = storage.get(storageKeys.CONFIG)

  commandParser.setOrigin(executable.origin)
  commandParser.setAliases(aliases)
  if (executable.tabId) storage.set(storageKeys.TAB_ID, executable.tabId)

  const contextInputValue = config.getValueById(configInputIds.CONTEXT)
  const tab = await getTab({ tabId })

  const context = createContext(contextInputValue, tab)
  const command = commandParser.read(executable.line).applyContext(context)

  if (!command.finished) {
    command.startExecuting()
    queue.change(executable.id, command.simplify())
    await command.execute()
  }

  const commandVisible = command.getCommandVisibleInChain()

  if (commandVisible) queue.change(executable.id, commandVisible.simplify())
  else queue.delete(executable.id)

  if (executable.tabId) storage.set(storageKeys.TAB_ID, originalTabId)
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, updatedTab) => {
  if (changeInfo.status !== 'complete') return

  const queue = storage.get(storageKeys.COMMAND_QUEUE)
  const events = storage.get(storageKeys.EVENTS)

  const pendingEvents = events.filter(event => new RegExp(event.url).test(updatedTab.url))

  if (pendingEvents.length === 0) return
  pendingEvents.forEach(event => queue.add(event.line, origins.BACKGROUND, tabId))
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

chrome.runtime.onInstalled.addListener(async () => {
  const tab = await getCurrentTab()
  const exists = await chrome.offscreen.hasDocument()

  if (!exists) {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['IFRAME_SCRIPTING'],
      justification: 'Secure execution of dynamic code inside a sandboxed iframe.'
    })
  }

  storage.set(storageKeys.TAB_ID, tab.id)
  storage.addEventListener(storageKeys.COMMAND_QUEUE, handleCommandQueueChange)
})
