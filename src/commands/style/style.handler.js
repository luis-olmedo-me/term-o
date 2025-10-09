import { applyElementStyles, getElementStyles } from '@src/processes/processes'

import { createHelpView } from '@src/helpers/command.helpers'
import { formatRule } from '../handlers.helpers'

export const handleSTYLES = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  if (P`list`) {
    command.update('Searching element styles.')
    const rules = await getElementStyles(tab.id, {
      searchByXpath: P`on`,
      searchByProperty: P`property`,
      searchBySelector: P`selector`
    })

    const formattedStyles = rules.map(formatRule)

    command.reset()
    if (rules.length) command.update(...formattedStyles)
  }

  if (P`apply`) {
    const rules = await applyElementStyles(tab.id, {
      searchByXpath: P`on`,
      newInlineStyles: P`apply`
    })

    const formattedStyles = rules.map(formatRule)

    if (rules.length) command.update(...formattedStyles)
  }

  if (P`help`) createHelpView(command)
}
