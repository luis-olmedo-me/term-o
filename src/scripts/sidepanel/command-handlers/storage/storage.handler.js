import { getStorage } from '@sidepanel/proccesses/workers'
import {
  displayHelp,
  formatStorageAsString,
  formatStorageProp,
  getNumberTabId
} from '../command-handlers.helpers'

export const handleSTORAGE = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  const tabId = P`tab-id` ? getNumberTabId(P`tab-id`) : tab.id

  if (P`local` || P`session` || P`cookie`) {
    const storage = await getStorage(tabId, {
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

  if (P`help`) displayHelp(command)
}
