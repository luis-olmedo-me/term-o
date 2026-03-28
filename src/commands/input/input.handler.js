import processManager from '@src/libs/process-manager'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatElement, formatText } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'

export const inputHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  const tabId = P`tab-id` ? cleanTabId(P`tab-id`) : storage.get(storageKeys.TAB).id

  if (P`text`) {
    const input = await processManager.requestInput()
    const update = formatText({ text: input })

    command.reset()
    command.update(update)
  }

  if (P`measure`) {
    command.update(['"Please click over the page to pick up an element."'])

    const elementStart = await processManager.requestElement(tabId)
    const updateStart = formatElement({
      ...elementStart,
      tabId: P`tab-id`,
      xpath: null,
      textContent: null
    })

    command.update(updateStart)
    command.update(['"Please click over the page to pick up an element."'])

    const elementEnd = await processManager.requestElement(tabId)
    const updateEnd = formatElement({
      ...elementEnd,
      tabId: P`tab-id`,
      xpath: null,
      textContent: null
    })

    command.reset()
    command.update(updateStart)
    command.update(updateEnd)

    await processManager.measure(tabId, {
      start: elementStart.xpath,
      end: elementEnd.xpath
    })
  }

  if (P`help`) createHelpView(command)
}
