import commandParser from '@src/libs/command-parser'
import storage from '@src/libs/storage'

import { getTab } from '@src/browser-api/tabs.api'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'

export default async (resolve, data) => {
  const { line, origin } = data

  const tabId = storage.get(storageKeys.TAB_ID)
  const aliases = storage.get(storageKeys.ALIASES)
  const config = storage.get(storageKeys.CONFIG)

  commandParser.setAliases(aliases)
  commandParser.setOrigin(origin)

  const contextInputValue = config.getValueById(configInputIds.CONTEXT)
  const tab = await getTab({ tabId })

  const context = createContext(contextInputValue, tab)
  const command = commandParser.read(line).applyContext(context)

  if (!command.finished) await command.execute()

  const commandVisible = command.getCommandVisibleInChain()

  resolve(commandVisible ? commandVisible.simplify() : null)
}
