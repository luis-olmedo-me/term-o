import processManager from '@src/libs/process-manager'

import { getTab } from '@src/browser-api/tabs.api'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatText } from '@src/helpers/format.helpers'
import { unquotify } from '@src/helpers/string.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'

export const urlHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  let tabId = storage.get(storageKeys.TAB).id
  console.log('o-test', tabId)

  if (P`tab-id`) {
    command.log(['"Connecting to the tab."'])
    const validTab = await getTab({ tabId: cleanTabId(P`tab-id`) })

    tabId = validTab.id
  }

  if (P`current`) {
    const text = await processManager.readPath(tabId, { path: 'window.location.href' })
    const log = formatText({ text: unquotify(text) })

    command.clearLogs()
    command.log(log)
  }

  if (P`help`) createHelpView(command)
}
