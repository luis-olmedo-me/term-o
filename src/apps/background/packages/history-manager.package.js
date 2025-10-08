import { configDefaultValues, configInputIds } from '@src/constants/config.constants'
import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import { getConfigValueByInputId } from '@src/helpers/config.helpers'
import { createContext } from '@src/helpers/contexts.helpers'
import { getStorageValue, setStorageValue } from '@src/helpers/storage.helpers'

const historyManager = (function () {
  let history = []
  let aliases = []
  let context = configDefaultValues[configInputIds.CONTEXT]
  let maxLines = configDefaultValues[configInputIds.MAX_LINES_PER_COMMAND]

  const handleStorageChanges = (changes, currentChanges) => {
    if (currentChanges !== storageNamespaces.LOCAL && currentChanges !== storageNamespaces.SESSION)
      return

    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === storageKeys.HISTORY) {
        history = newValue
      }
      if (storageKey === storageKeys.ALIASES) {
        aliases = newValue
      }
      if (storageKey === storageKeys.CONFIG) {
        context = getConfigValueByInputId(configInputIds.CONTEXT, newValue, context)
        maxLines = getConfigValueByInputId(configInputIds.MAX_LINES_PER_COMMAND, newValue, maxLines)
      }
    }
  }

  const getHistoryFromLS = async () => {
    const configFromLS = await getStorageValue(storageNamespaces.LOCAL, storageKeys.CONFIG)
    const aliasesFromLS = await getStorageValue(storageNamespaces.LOCAL, storageKeys.ALIASES)
    const historyFromLS = await getStorageValue(storageNamespaces.SESSION, storageKeys.HISTORY)

    history = historyFromLS || []
    aliases = aliasesFromLS || []
    context = getConfigValueByInputId(configInputIds.CONTEXT, configFromLS, context)
    maxLines = getConfigValueByInputId(configInputIds.MAX_LINES_PER_COMMAND, configFromLS, maxLines)
  }

  getHistoryFromLS()
  chrome.storage.onChanged.addListener(handleStorageChanges)

  return {
    getMaxLines: () => maxLines,
    getHistory: () => history,
    getAliases: () => aliases,
    getContext: tab => createContext(context, tab),
    setHistory: value => setStorageValue(storageNamespaces.SESSION, storageKeys.HISTORY, value)
  }
})()

export default historyManager
