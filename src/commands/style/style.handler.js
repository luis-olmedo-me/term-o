import processManager from '@src/libs/process-manager'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatStyle, formatText } from '@src/helpers/format.helpers'

export const styleHandler = async command => {
  const storage = command.get('storage')
  const tabId = storage.get(storageKeys.TAB).id
  const P = name => command.props[name]

  if (P`list`) {
    const config = storage.get(storageKeys.CONFIG)

    command.update(['Searching element styles.'])
    const styles = await processManager.getElementStyles(tabId, {
      searchByXpath: P`on`,
      searchByProperty: P`property`,
      theme: config.theme
    })
    const formattedStyles = styles.map(formatStyle)

    command.reset()
    command.update(...formattedStyles)
  }

  if (P`apply`) {
    const config = storage.get(storageKeys.CONFIG)

    const rules = await processManager.applyElementStyles(tabId, {
      searchByXpath: P`on`,
      newInlineStyles: P`apply`,
      theme: config.theme
    })

    const formattedStyles = rules.map(formatStyle)

    if (rules.length) command.update(...formattedStyles)
  }

  if (P`color-pick`) {
    const config = storage.get(storageKeys.CONFIG)

    command.update(['Click the notification on the page to start picking a color.'])
    const color = await processManager.pickColor({ theme: config.theme })
    const update = formatText({ text: color })

    command.reset()
    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
