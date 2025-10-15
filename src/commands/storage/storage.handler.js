import { getStorage, setStorage } from '@src/processes'

import { createHelpView } from '@src/helpers/command.helpers'
import { formatStorageAsString, formatStorageProp, formatText } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'
import { getStorageNamespace } from './storage.helpers'

export const storageHandler = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  const tabId = P`tab-id` ? cleanTabId(P`tab-id`) : tab.id

  if (P`local` || P`session` || P`cookie`) {
    const [key, value] = P`set`
    const namespace = getStorageNamespace(P`local`, P`session`, P`cookie`)

    const storage = P`set`.length
      ? await setStorage(tabId, {
          namespace,
          key,
          value
        })
      : await getStorage(tabId, {
          includeLocal: P`local`,
          includeSession: P`session`,
          includeCookies: P`cookie`
        })
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
