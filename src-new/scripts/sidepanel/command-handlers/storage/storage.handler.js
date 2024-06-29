import { getStorage } from '@sidepanel/proccesses/workers'
import { getColor as C } from '@src/theme/theme.helpers'

export const handleSTORAGE = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  const storages = await getStorage(tab.id, {
    includeLocal: P`local`,
    includeSession: P`session`,
    includeCookies: P`cookie`
  })

  command.reset()
  Object.values(storages).forEach(values => {
    Object.entries(values).forEach(([key, value]) => {
      command.update(`${C`bright-black`}${key}${C`white`}=${C`yellow`}"${value}"`)
    })
  })
}
