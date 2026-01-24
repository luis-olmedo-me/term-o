import commandParser from '@src/libs/command-parser'
import storage from '@src/libs/storage'

import { getCurrentTab } from '@src/browser-api/tabs.api'
import { origins } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
import { setUpHandlers } from '@src/helpers/process.helpers'
import { createInternalTab } from '@src/helpers/tabs.helpers'
import processHandlers from './process-handlers'

const backgroundHandler = setUpHandlers(processHandlers)

const handleCommandQueueChange = async (storageRef, commandParserRef) => {
  const queue = storageRef.get(storageKeys.COMMAND_QUEUE)
  const executable = queue.executable

  if (queue.isExecuting || !executable) return
  await storageRef.restart()

  const originalTab = storageRef.get(storageKeys.TAB)
  const aliases = storageRef.get(storageKeys.ALIASES)
  const config = storageRef.get(storageKeys.CONFIG)
  const addons = storageRef.get(storageKeys.ADDONS)

  const tab = executable.tab || originalTab
  const addonNames = addons.values.map(addon => addon.name)
  const externalBases = addons.asCommands(addonNames)

  commandParserRef.setOrigin(executable.origin)
  commandParserRef.setAliases(aliases)
  commandParserRef.setExternalBases(externalBases)
  if (executable.tab) storageRef.set(storageKeys.TAB, executable.tab)

  const contextInputValue = config.getValueById(configInputIds.CONTEXT)

  const context = createContext(contextInputValue, tab)
  const command = commandParserRef.read(executable.line).applyContext(context).applyQueue(queue)

  if (!command.finished) {
    command.startExecuting()
    command.addEventListener('update', () => queue.change(executable.id, command.jsonUI()))
    queue.change(executable.id, command.jsonUI())
    await command.execute()
  }

  const commandVisible = command.getCommandVisibleInChain()

  if (commandVisible) queue.change(executable.id, commandVisible.jsonUI())
  else queue.delete(executable.id)

  if (executable.tabId) storageRef.set(storageKeys.TAB, originalTab)
}

const handleStorageChange = (storageRef, commandParserRef) => {
  return changes => {
    const hasQueueChanges = storageKeys.COMMAND_QUEUE in changes
    storageRef.handleStorageChanges(changes)

    if (hasQueueChanges) handleCommandQueueChange(storageRef, commandParserRef)
  }
}
const ensureOffscreenIsActive = async () => {
  const exists = await chrome.offscreen.hasDocument()

  if (!exists) {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['IFRAME_SCRIPTING'],
      justification: 'Secure execution of dynamic code inside a sandboxed iframe.'
    })
  }
}

const handleTabsUpdated = storageRef => {
  return (_tabId, changeInfo, updatedTab) => {
    if (changeInfo.status !== 'complete') return

    const queue = storageRef.get(storageKeys.COMMAND_QUEUE)
    const events = storageRef.get(storageKeys.EVENTS)

    const pendingEvents = events.filter(event => new RegExp(event.url).test(updatedTab.url))

    if (pendingEvents.length === 0) return
    const tab = createInternalTab(updatedTab)

    pendingEvents.forEach(event => queue.add(event.line, origins.AUTO, tab))
  }
}

const handleInstalled = storageRef => {
  return async () => {
    storageRef.handleStorageChangesManually()

    const tab = await getCurrentTab()
    await ensureOffscreenIsActive()

    storageRef.set(storageKeys.TAB, tab)
  }
}

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

chrome.tabs.onUpdated.addListener(handleTabsUpdated(storage))

chrome.runtime.onInstalled.addListener(handleInstalled(storage))

chrome.storage.onChanged.addListener(handleStorageChange(storage, commandParser))

chrome.runtime.onMessage.addListener(backgroundHandler)
