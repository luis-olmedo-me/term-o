import commandBases from '@src/commands'
import CommandParser from '@src/libs/command-parser/manual'
import Storage from '@src/libs/storage/manual'

import { getCurrentTab, getTab } from '@src/browser-api/tabs.api'
import { bannerTypes } from '@src/constants/banners.constants'
import { configInputIds, DEFAULT_CONTEXT } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
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

const handleQueueChange = async (storage, commandParser) => {
  const queue = storage.get(storageKeys.QUEUE)
  const queueItem = queue.next()

  if (queue.isExecuting || !queueItem) return

  const originalTab = storage.get(storageKeys.TAB)
  const config = storage.get(storageKeys.CONFIG)

  const id = queueItem.id
  const tab = queueItem.tab || originalTab
  const origin = queueItem.origin
  const event = queueItem.event

  if (queueItem.tab) storage.set(storageKeys.TAB, queueItem.tab)

  const contextInputValue = config.getValueById(configInputIds.CONTEXT)
  const isTermOpen = !!sidePanelPort

  const context = createContext(contextInputValue, tab)
  const commandList = commandParser.read(queueItem.line)

  if (event) commandList.preloadParams(event.params)
  commandList.share({ storage, isTermOpen, context, origin, event, commandList })
  queue.change(id, commandList.toJSON({ flat: true }))
  commandList.addEventListener('update', () => queue.change(id, commandList.toJSON({ flat: true })))

  await commandList.execute()

  if (queueItem.tabId) storage.set(storageKeys.TAB, originalTab)
  queue.complete(queueItem.id)
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

  storage.set(storageKeys.TAB, tab)
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, updatedTab) => {
  if (changeInfo.status !== 'complete') return
  const storage = await getStorage()
  const tab = storage.get(storageKeys.TAB)

  if (tab.id === tabId) storage.set(storageKeys.TAB, updatedTab)
})

chrome.runtime.onInstalled.addListener(async () => {
  const storage = await getStorage()
  const tab = await getCurrentTab()

  storage.set(storageKeys.TAB, tab)
  await ensureOffscreenIsActive()
})

chrome.storage.onChanged.addListener(async changes => {
  const hasQueueChanges = storageKeys.QUEUE in changes
  const storage = await getStorage()
  const commandParser = getCommandParser(storage)

  const isValidUpdate = storageInstance.handleStorageChanges(changes)
  if (hasQueueChanges && isValidUpdate) await handleQueueChange(storage, commandParser)
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
      { sender, storage, commandParser, isTermOpen }
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
    const banners = storage.get(storageKeys.BANNERS)

    config.change(configInputIds.CONTEXT, DEFAULT_CONTEXT)
    banners.addOrUpdate({
      message: `Invalid terminal context line were cleared.`,
      type: bannerTypes.INFO,
      id: 'terminal-context-outdated'
    })
  }

  if (was092 || was091 || was090) {
    const storage = await getStorage()
    const banners = storage.get(storageKeys.BANNERS)

    storage.set(storageKeys.EVENTS, [])
    banners.addOrUpdate({
      message: `Invalid tab events were cleared.`,
      type: bannerTypes.INFO,
      id: 'tab-events-outdated'
    })
  }
})
