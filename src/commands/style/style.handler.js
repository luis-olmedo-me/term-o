import storage from '@src/libs/storage'

import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatStyle } from '@src/helpers/format.helpers'
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
    const rules = await applyElementStyles(tabId, {
      searchByXpath: P`on`,
      newInlineStyles: P`apply`
    })

    const formattedStyles = rules.map(formatStyle)

    if (rules.length) command.update(...formattedStyles)
  }

  if (P`color-pick`) {
    const config = storage.get(storageKeys.CONFIG)

    const themeName = config.getValueById(configInputIds.THEME_NAME)
    const selectedTheme = config.themes.find(theme => theme.name === themeName)

    const pick = await pickColor(tabId, { theme: selectedTheme })

    if (pick.error) command.throw(pick.error)
    else command.update(pick.color)
  }

  if (P`help`) createHelpView(command)
}
