import commandBases from '@src/commands'
import CommandParser from '@src/libs/command-parser/manual'
import Storage from '@src/libs/storage/manual'

import { getCurrentTab, getTab } from '@src/browser-api/tabs.api'
import { configInputIds, DEFAULT_CONTEXT } from '@src/constants/config.constants'
import { availableEvents } from '@src/constants/events.constants'
import { oldColorPattern } from '@src/constants/patterns.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
import { createInternalTab } from '@src/helpers/tabs.helpers'
import processHandlers from './process-handlers'

let storageInstance
let commandParserInstance
let sidePanelPort = null

const getStorage = async () => {
  if (!storageInstance) storageInstance = new Storage().handleStorageChangesManually()
  if (!storageInstance.initiated) await storageInstance.init()

  return storageInstance
}

const getCommandParser = storage => {
  if (!commandParserInstance) commandParserInstance = new CommandParser(commandBases)

  const aliases = storage.get(storageKeys.ALIASES)
  const addons = storage.get(storageKeys.ADDONS)

  const addonNames = addons.values.map(addon => addon.name)
  const externalBases = addons.asCommands(addonNames)

  commandParserInstance.setAliases(aliases)
  commandParserInstance.setExternalBases(externalBases)

  return commandParserInstance
}

const handleCommandQueueChange = async (storage, commandParser) => {
  const queue = storage.get(storageKeys.COMMAND_QUEUE)
  const executable = queue.executable

  if (queue.isExecuting || !executable) return

  const originalTab = storage.get(storageKeys.TAB)
  const config = storage.get(storageKeys.CONFIG)

  const tab = executable.tab || originalTab
  const origin = executable.origin
  const eventType = executable.eventType

  if (executable.tab) storage.set(storageKeys.TAB, executable.tab)

  const contextInputValue = config.getValueById(configInputIds.CONTEXT)
  const isTermOpen = !!sidePanelPort

  const context = createContext(contextInputValue, tab)
  const command = commandParser
    .read(executable.line)
    .share({ storage, isTermOpen, context, origin, eventType })

  if (!command.finished) {
    command.startExecuting()
    command.addEventListener('update', () => queue.change(executable.id, command.jsonUI()))
    queue.change(executable.id, command.jsonUI())
    await command.execute()
  }

  const commandVisible = command.getCommandVisibleInChain()

  if (commandVisible) queue.change(executable.id, commandVisible.jsonUI())
  else queue.delete(executable.id)

  if (executable.tabId) storage.set(storageKeys.TAB, originalTab)
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

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

chrome.tabs.onActivated.addListener(async activeInfo => {
  const storage = await getStorage()
  const config = storage.get(storageKeys.CONFIG)
  const switchTabAutomatically = config.getValueById(configInputIds.SWITCH_TAB_AUTOMATICALLY)

  if (!switchTabAutomatically) return
  const tab = await getTab({ tabId: activeInfo.tabId })
  const internalTab = createInternalTab(tab)

  storage.set(storageKeys.TAB, internalTab)
})

chrome.runtime.onInstalled.addListener(async () => {
  const storage = await getStorage()
  const tab = await getCurrentTab()

  storage.set(storageKeys.TAB, tab)
  await ensureOffscreenIsActive()
})

chrome.storage.onChanged.addListener(async changes => {
  const hasQueueChanges = storageKeys.COMMAND_QUEUE in changes
  const storage = await getStorage()
  const commandParser = getCommandParser(storage)

  storageInstance.handleStorageChanges(changes)
  if (hasQueueChanges) await handleCommandQueueChange(storage, commandParser)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { data } = request.data || {}
  const handler = processHandlers[request.type]

  if (!handler) return
  const prepareHandler = async () => {
    const storage = await getStorage()
    const commandParser = getCommandParser(storage)
    const isTermOpen = !!sidePanelPort

    handler(
      data => sendResponse({ status: 'ok', data }),
      error => sendResponse({ status: 'error', error }),
      data,
      storage,
      commandParser,
      isTermOpen
    )
  }

  prepareHandler()

  return true
})

chrome.runtime.onConnect.addListener(port => {
  if (port.name !== 'sidepanel') return
  sidePanelPort = port

  port.onDisconnect.addListener(() => {
    sidePanelPort = null
  })
})

chrome.runtime.onInstalled.addListener(async details => {
  if (details.reason !== 'update') return
  const was090 = details.previousVersion === '0.9.0'
  const was091 = details.previousVersion === '0.9.1'
  const was092 = details.previousVersion === '0.9.2'

  if (was090) {
    const storage = await getStorage()

    const config = storage.get(storageKeys.CONFIG)
    const contextInputValue = config.getValueById(configInputIds.CONTEXT)
    const hasOldColorPattern = oldColorPattern.test(contextInputValue)

    if (hasOldColorPattern) config.change(configInputIds.CONTEXT, DEFAULT_CONTEXT)
  }

  if (was092 || was091 || was090) {
    const storage = await getStorage()

    const events = storage.get(storageKeys.EVENTS)
    const newEvents = events.map(event =>
      event.type ? event : { ...event, type: availableEvents.TAB_LOADED }
    )

    storage.set(storageKeys.EVENTS, newEvents)
  }
})
