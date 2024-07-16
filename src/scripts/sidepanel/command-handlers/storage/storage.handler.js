import { getColor as C } from '../../../../theme/theme.helpers'
import { getStorage } from '../../proccesses/workers'
import { displayHelp } from '../command-handlers.helpers'

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
        command.update(`${C`purple`}"${key}" ${C`yellow`}"${value}"`)
      })
    })
  }

  if (P`help`) displayHelp(command)
}
