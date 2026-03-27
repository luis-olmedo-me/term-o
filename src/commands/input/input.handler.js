import processManager from '@src/libs/process-manager'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatText } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'

export const inputHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  const tabId = P`tab-id` ? cleanTabId(P`tab-id`) : storage.get(storageKeys.TAB).id

  if (P`text`) {
    const input = await processManager.requestInput()
    const formattedInput = formatText({ text: input })

    command.reset()
    command.update(formattedInput)
  }

  if (P`measure`) {
    const input = await processManager.requestMeasure(tabId)
    const formattedInput = formatText({ text: input })

    command.reset()
    command.update(formattedInput)
  }

  if (P`help`) createHelpView(command)
}
