import processManager from '@src/libs/process-manager'
import storage from '@src/libs/storage'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatStorageAsString, formatStorageProp, formatText } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'
import { getStorageNamespace } from './storage.helpers'

export const storageHandler = async command => {
  const P = name => command.props[name]

  const tabId = P`tab-id` ? cleanTabId(P`tab-id`) : storage.get(storageKeys.TAB).id

  if (P`local` || P`session` || P`cookie`) {
    const isSetting = P`set`.length > 0
    const [key, value] = P`set`
    const namespace = getStorageNamespace(P`local`, P`session`, P`cookie`)
    let storage = null

    if (isSetting) {
      storage = await processManager.setStorage(tabId, {
        namespace,
        key,
        value
      })
    } else {
      storage = await processManager.getStorage(tabId, {
        includeLocal: P`local`,
        includeSession: P`session`,
        includeCookies: P`cookie`
      })
    }

    const storageEntries = Object.entries(storage)

    command.reset()
    const updates = P`json`
      ? [formatStorageAsString({ storage, tabId: P`tab-id` })]
      : storageEntries.map(([key, value]) => formatStorageProp({ key, value, tabId: P`tab-id` }))

    command.update(...updates)
  }

  if (P`copy`) {
    const text = P`copy`
    const update = formatText({ text })

    await navigator.clipboard.writeText(text)

    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
