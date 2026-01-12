import commandParser from '@src/libs/command-parser'
import storage from '@src/libs/storage'

import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'

export default async (resolve, _reject, data) => {
  const { line, origin } = data

  const tab = storage.get(storageKeys.TAB)
  const aliases = storage.get(storageKeys.ALIASES)
  const config = storage.get(storageKeys.CONFIG)
  const addons = storage.get(storageKeys.ADDONS)

  const addonNames = addons.values.map(addon => addon.name)

  const externalBases = await addons.asCommands(addonNames)

  commandParser.setAliases(aliases)
  commandParser.setOrigin(origin)
  commandParser.setExternalBases(externalBases)

  const contextInputValue = config.getValueById(configInputIds.CONTEXT)

  const context = createContext(contextInputValue, tab)
  const command = commandParser.read(line).applyContext(context)

  if (!command.finished) await command.execute()

  const commandVisible = command.getCommandVisibleInChain()

  resolve(commandVisible ? commandVisible.simplify() : null)
}
