import storage from '@src/libs/storage'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatStyle } from '@src/helpers/format.helpers'
import { applyElementStyles, getElementStyles } from '@src/processes'

export const styleHandler = async command => {
  const tabId = storage.get(storageKeys.TAB_ID)
  const P = name => command.props[name]

  if (P`list`) {
    command.update('Searching element styles.')
    const styles = await getElementStyles(tabId, {
      searchByXpath: P`on`,
      searchByProperty: P`property`
    })
    const formattedStyles = styles.map(formatStyle)

    command.reset()
    command.update(...formattedStyles)
  }

  if (P`apply`) {
    const rules = await applyElementStyles(tabId, {
      searchByXpath: P`on`,
      newInlineStyles: P`apply`
    })

    const formattedStyles = rules.map(formatStyle)

    if (rules.length) command.update(...formattedStyles)
  }

  if (P`help`) createHelpView(command)
}
