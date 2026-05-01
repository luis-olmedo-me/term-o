import processManager from '@src/libs/process-manager'

import { origins } from '@src/constants/command.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatStyle, formatText } from '@src/helpers/format.helpers'
import { getQuotedString } from '@src/helpers/string.helpers'
import { truncate } from '@src/helpers/utils.helpers'

export const styleHandler = async command => {
  const storage = command.get('storage')
  const tabId = storage.get(storageKeys.TAB).id
  const P = name => command.props[name]

  if (P`list`) {
    const config = storage.get(storageKeys.CONFIG)

    command.log(['"Searching element styles."'])
    const styledElement = await processManager.getElementStyles(tabId, {
      searchByXpath: P`xpath`,
      searchByProperty: P`style`,
      theme: config.theme
    })

    const formattedStyles = formatStyle(styledElement)

    command.clearLogs()
    if (styledElement.styles.length) command.log(formattedStyles)
  }

  if (P`apply`) {
    const config = storage.get(storageKeys.CONFIG)

    const styledElement = await processManager.applyElementStyles(tabId, {
      searchByXpath: P`xpath`,
      styles: P`style`,
      theme: config.theme
    })

    const formattedStyles = formatStyle(styledElement)

    command.log(formattedStyles)
  }

  if (P`color-pick`) {
    const isTermOpen = command.get('isTermOpen')
    const origin = command.get('origin')

    if (!isTermOpen) {
      throw 'Please make sure the terminal is open before attempting to pick a color.'
    }

    if (origin !== origins.MANUAL) {
      command.log(['"To proceed, you need to pick a color. Do you want to pick it now? (y/n)"'])
      const input = await processManager.requestInput()
      const formattedInput = formatText({ text: input })
      const truncatedInput = truncate(input, 30)
      const quotedInput = getQuotedString(truncatedInput)

      command.log(formattedInput)
      if (input === 'n') throw 'Operation canceled by user.'
      if (input !== 'y') throw `Invalid input ${quotedInput}. Defaulting to cancellation.`
    }

    command.log(['"Pick a color."'])
    const color = await processManager.pickColor()
    const log = formatText({ text: color })

    command.clearLogs()
    command.log(log)
  }

  if (P`help`) createHelpView(command)
}
