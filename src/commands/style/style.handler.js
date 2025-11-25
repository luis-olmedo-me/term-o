import storage from '@src/libs/storage'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatStyle, formatText } from '@src/helpers/format.helpers'
import { applyElementStyles, getElementStyles, pickColor } from '@src/processes'

export const styleHandler = async command => {
  const tabId = storage.get(storageKeys.TAB).id
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
    const config = storage.get(storageKeys.CONFIG)

    const rules = await applyElementStyles(tabId, {
      searchByXpath: P`on`,
      newInlineStyles: P`apply`,
      theme: config.theme
    })

    const formattedStyles = rules.map(formatStyle)

    if (rules.length) command.update(...formattedStyles)
  }

  if (P`color-pick`) {
    const config = storage.get(storageKeys.CONFIG)

    command.update('Click the bubble on the page to start color picking.')
    const color = await pickColor(tabId, { theme: config.theme })

    command.reset()
    command.update(formatText({ text: color }))
  }

  if (P`help`) createHelpView(command)
}
