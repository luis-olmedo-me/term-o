import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'

export default async (resolve, _reject, data, storage, commandParser, isTermOpen) => {
  const { line, origin } = data

  commandParser.setOrigin(origin)

  const tab = storage.get(storageKeys.TAB)
  const config = storage.get(storageKeys.CONFIG)

  const contextInputValue = config.getValueById(configInputIds.CONTEXT)

  const context = createContext(contextInputValue, tab)
  const command = commandParser.read(line).share({ storage, isTermOpen, context })

  if (!command.finished) await command.execute()
  const commandVisible = command.getCommandVisibleInChain()

  resolve(commandVisible ? commandVisible.json() : null)
}
