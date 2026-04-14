import processManager from '@src/libs/process-manager'

import { getTab } from '@src/browser-api/tabs.api'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatStorageAsString, formatStorageProp, formatText } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'
import { getStorageNamespace } from './storage.helpers'

export const storageHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  let tabId = storage.get(storageKeys.TAB).id

  if (P`tab-id`) {
    command.update(['"Connecting to the tab."'])
    const validTab = await getTab({ tabId: cleanTabId(P`tab-id`) })

    tabId = validTab.id
  }

  if (P`local` || P`session` || P`cookie`) {
    const isSetting = P`set`.length > 0
    let storage = null

    if (isSetting) {
      const namespace = getStorageNamespace(P`local`, P`session`, P`cookie`)

      command.update(['"Applying changes in storage."'])
      for (const [key, value] of P`set`) {
        await processManager.setStorage(tabId, {
          namespace,
          key,
          value
        })

        storage = { ...storage, [key]: value }
      }
    } else {
      storage = await processManager.getStorage(tabId, {
        includeLocal: P`local`,
        includeSession: P`session`,
        includeCookies: P`cookie`
      })
    }

    const storageEntries = Object.entries(storage)

    command.reset()
    const updates = P`see-json`
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
