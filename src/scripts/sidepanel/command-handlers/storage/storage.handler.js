import { getStorage } from '@sidepanel/proccesses/workers'
import { displayHelp, formatStorageAsString, formatStorageProp } from '../command-handlers.helpers'

export const handleSTORAGE = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  if (P`local` || P`session` || P`cookie`) {
    const storage = await getStorage(tab.id, {
      includeLocal: P`local`,
      includeSession: P`session`,
      includeCookies: P`cookie`
    })

    command.reset()
    const updates = P`json`
      ? [formatStorageAsString({ storage })]
      : Object.entries(storage).map(([key, value]) => formatStorageProp({ key, value }))

    command.update(...updates)
  }

  if (P`help`) displayHelp(command)
}
