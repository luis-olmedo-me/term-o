import processManager from '@src/libs/process-manager'

import { origins } from '@src/constants/command.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatStyle, formatText } from '@src/helpers/format.helpers'

export const styleHandler = async command => {
  const storage = command.get('storage')
  const tabId = storage.get(storageKeys.TAB).id
  const P = name => command.props[name]

  if (P`list`) {
    const config = storage.get(storageKeys.CONFIG)

    command.update(['"Searching element styles."'])
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
    const isTermOpen = command.get('isTermOpen')

    if (!isTermOpen) {
      throw 'Please make sure the terminal is open before attempting to pick a color.'
    }

    if (command.origin !== origins.MANUAL) {
      command.update(['"To proceed, you need to pick a color. Do you want to pick it now? (y/n)"'])
      const input = await processManager.requestInput()
      const formattedInput = formatText({ text: input })

      command.update(formattedInput)
      if (input === 'n') throw 'Operation canceled by user.'
      if (input !== 'y') throw 'Invalid input. Defaulting to cancellation.'
    }

    command.update(['"Pick a color."'])
    const color = await processManager.pickColor()
    const update = formatText({ text: color })

    command.reset()
    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
