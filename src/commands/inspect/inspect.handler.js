import processManager from '@src/libs/process-manager'

import { getTab } from '@src/browser-api/tabs.api'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatStringSearch, formatText } from '@src/helpers/format.helpers'
import { getJSONPathValue } from '@src/helpers/json.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'

export const inspectHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  let tabId = storage.get(storageKeys.TAB).id

  if (P`tab-id`) {
    command.log(['"Connecting to the tab."'])
    const validTab = await getTab({ tabId: cleanTabId(P`tab-id`) })

    tabId = validTab.id
  }

  if (P`read` && !P`input`) {
    command.log(['"Reading path from tab."'])
    const text = await processManager.readPath(tabId, { path: P`path` })
    const log = formatText({ text })

    command.clearLogs()
    command.log(log)
  }

  if (P`read` && P`input`) {
    const json = JSON.parse(P`input`)
    const text = getJSONPathValue(json, P`path`)
    const log = formatText({ text })

    command.clearLogs()
    command.log(log)
  }

  if (P`match`) {
    const match = P`query`
    const input = P`input`
    const matchRegex = new RegExp(match, 'gi')

    if (matchRegex.test(input)) {
      const log = formatStringSearch({ query: matchRegex, input })

      command.log(log)
    }
  }

  if (P`help`) createHelpView(command)
}
