import processManager from '@src/libs/process-manager'
import storage from '@src/libs/storage'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatText } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'

export const inspectHandler = async command => {
  const P = name => command.props[name]
  const tabId = P`tab-id` ? cleanTabId(P`tab-id`) : storage.get(storageKeys.TAB).id

  if (P`path`) {
    const text = await processManager.readPath(tabId, { path: P`path` })
    const update = formatText({ text })

    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
