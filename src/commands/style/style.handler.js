import { applyElementStyles, getElementStyles } from '@src/processes'

import { createHelpView } from '@src/helpers/command.helpers'
import { formatStyle } from '@src/helpers/format.helpers'

export const styleHandler = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  if (P`list`) {
    command.update('Searching element styles.')
    const styles = await getElementStyles(tab.id, {
      searchByXpath: P`on`,
      searchByProperty: P`property`
    })
    const formattedStyles = styles.map(formatStyle)

    command.reset()
    command.update(...formattedStyles)
  }

  if (P`apply`) {
    const rules = await applyElementStyles(tab.id, {
      searchByXpath: P`on`,
      newInlineStyles: P`apply`
    })

    const formattedStyles = rules.map(formatStyle)

    if (rules.length) command.update(...formattedStyles)
  }

  if (P`help`) createHelpView(command)
}
