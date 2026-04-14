import processManager from '@src/libs/process-manager'

import { getTab } from '@src/browser-api/tabs.api'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatStringSearch, formatText } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'

export const inspectHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  let tabId = storage.get(storageKeys.TAB).id

  if (P`tab-id`) {
    command.update(['"Connecting to the tab."'])
    const validTab = await getTab({ tabId: cleanTabId(P`tab-id`) })

    tabId = validTab.id
  }

  if (P`read`) {
    command.update(['"Reading path from tab."'])
    const text = await processManager.readPath(tabId, { path: P`path` })
    const update = formatText({ text })

    command.reset()
    command.update(update)
  }

  if (P`match`) {
    const match = P`query`
    const input = P`input`
    const matchRegex = new RegExp(match, 'gi')

    if (matchRegex.test(input)) {
      const update = formatStringSearch({ query: matchRegex, input })

      command.update(update)
    }
  }

  if (P`help`) createHelpView(command)
}
