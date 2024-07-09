import { getElementStyles } from '@sidepanel/proccesses/workers'
import { getColor as C } from '@src/theme/theme.helpers'

export const handleSTYLES = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  if (P`on`) {
    command.update('Searching element styles.')
    const styles = await getElementStyles(tab.id, {
      searchByXpath: P`on`
    })

    const formattedStyles = styles.map(([name, value, namespace]) => {
      return `${C`purple`}"${name}" ${C`yellow`}"${value}" ${C`yellow`}"${namespace}"`
    })

    command.reset()
    command.update(...formattedStyles)
  }
}
