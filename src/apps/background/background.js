import commandParser from '@src/libs/command-parser'
import processWaitList from '@src/libs/process-wait-list'
import storage from '@src/libs/storage'

import { getCurrentTab } from '@src/browser-api/tabs.api'
import { origins } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
import { createInternalTab } from '@src/helpers/tabs.helpers'
import processHandlers from './process-handlers'

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

const handleCommandQueueChange = async () => {
  const queue = storage.get(storageKeys.COMMAND_QUEUE)
  const executable = queue.executable

  if (queue.isExecuting || !executable) return

  const originalTab = storage.get(storageKeys.TAB)
  const aliases = storage.get(storageKeys.ALIASES)
  const config = storage.get(storageKeys.CONFIG)
  const tab = executable.tab || originalTab

  commandParser.setOrigin(executable.origin)
  commandParser.setAliases(aliases)
  if (executable.tab) storage.set(storageKeys.TAB, executable.tab)

  const contextInputValue = config.getValueById(configInputIds.CONTEXT)

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

  if (executable.tabId) storage.set(storageKeys.TAB, originalTab)
}

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, updatedTab) => {
  if (changeInfo.status !== 'complete') return

  const queue = storage.get(storageKeys.COMMAND_QUEUE)
  const events = storage.get(storageKeys.EVENTS)

  const pendingEvents = events.filter(event => new RegExp(event.url).test(updatedTab.url))

  if (pendingEvents.length === 0) return
  const tab = createInternalTab(updatedTab)

  pendingEvents.forEach(event => queue.add(event.line, origins.BACKGROUND, tab))
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

  storage.set(storageKeys.TAB, tab)
})

chrome.storage.onChanged.addListener(changes => {
  const hasQueueChanges = storageKeys.COMMAND_QUEUE in changes

  if (hasQueueChanges) handleCommandQueueChange()
})
