import processManager from '@src/libs/process-manager'

import { getTab } from '@src/browser-api/tabs.api'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatStorageAsString, formatStorageProp, formatText } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'
import { getStorageNamespace, isStorageMatch } from './storage.helpers'

export const storageHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  let tabId = storage.get(storageKeys.TAB).id

  if (P`tab-id`) {
    command.log(['"Connecting to the tab."'])
    const validTab = await getTab({ tabId: cleanTabId(P`tab-id`) })

    tabId = validTab.id
  }

  if (P`list`) {
    const filters = P`data`

    command.log(['"Reading storage."'])
    const storage = await processManager.getStorage(tabId, {
      includeLocal: P`local`,
      includeSession: P`session`,
      includeCookies: P`cookie`
    })

    const storageFiltered = Object.entries(storage).filter(entry => isStorageMatch(filters, entry))

    const updates = P`see-json`
      ? formatStorageAsString({ storage: Object.fromEntries(storageFiltered), tabId: P`tab-id` })
      : storageFiltered.map(([key, value]) => formatStorageProp({ key, value, tabId: P`tab-id` }))

    command.clearLogs()
    command.log(...updates)
  }

  if (P`set`) {
    let storage = null
    const namespace = getStorageNamespace(P`local`, P`session`, P`cookie`)

    command.log(['"Applying changes in storage."'])
    for (const [key, value] of P`data`) {
      await processManager.setStorage(tabId, {
        namespace,
        key,
        value
      })

      storage = { ...storage, [key]: value }
    }

    const storageEntries = Object.entries(storage)

    command.clearLogs()
    const updates = P`see-json`
      ? formatStorageAsString({ storage, tabId: P`tab-id` })
      : storageEntries.map(([key, value]) => formatStorageProp({ key, value, tabId: P`tab-id` }))

    command.log(...updates)
  }

  if (P`get`) {
    const keySearh = P`key`

    command.log(['"Reading storage."'])
    const storage = await processManager.getStorage(tabId, {
      includeLocal: P`local`,
      includeSession: P`session`,
      includeCookies: P`cookie`
    })

    const storageFiltered = Object.entries(storage).filter(([key]) => keySearh === key)
    const hasFoundStorageValues = storageFiltered.length > 0

    if (!hasFoundStorageValues) throw `Storage key did not match any other key.`

    const updates = P`see-json`
      ? formatStorageAsString({ storage: Object.fromEntries(storageFiltered), tabId: P`tab-id` })
      : storageFiltered.map(([key, value]) => formatStorageProp({ key, value, tabId: P`tab-id` }))

    command.clearLogs()
    command.log(...updates)
  }

  if (P`copy`) {
    const text = P`input`
    const update = formatText({ text })

    await navigator.clipboard.writeText(text)

    command.log(update)
  }

  if (P`help`) createHelpView(command)
}
