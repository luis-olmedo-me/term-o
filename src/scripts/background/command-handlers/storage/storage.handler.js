import { getStorage } from '@sidepanel/proccesses/workers'
import { displayHelp, formatStorageProp } from '../command-handlers.helpers'

export const handleSTORAGE = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  if (P`list`) {
    const showAll = !P`local` && !P`session` && !P`cookie`

    const storages = await getStorage(tab.id, {
      includeLocal: P`local` || showAll,
      includeSession: P`session` || showAll,
      includeCookies: P`cookie` || showAll
    })

    command.reset()
    Object.values(storages).forEach(values => {
      Object.entries(values).forEach(([key, value]) => {
        const update = formatStorageProp({ key, value })

        command.update(update)
      })
    })
  }

  if (P`help`) displayHelp(command)
}
