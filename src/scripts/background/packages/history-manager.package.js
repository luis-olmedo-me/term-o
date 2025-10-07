import { configIds, configInputIds } from '@src/constants/config.constants'
import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import { getConfigValueByInputId } from '@src/helpers/config.helpers'
import { createContext } from '@src/helpers/contexts.helpers'
import { getStorageValue, setStorageValue } from '@src/helpers/storage.helpers'

const historyManager = (function () {
  let history = []
  let context = ''

  const handleStorageChanges = (changes, currentChanges) => {
    if (currentChanges !== storageNamespaces.LOCAL && currentChanges !== storageNamespaces.SESSION)
      return

    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === storageKeys.HISTORY) {
        history = newValue
      }
      if (storageKey === storageKeys.CONFIG) {
        context = getConfigValueByInputId(configInputIds.CONTEXT, newValue, '')
      }
    }
  }

  const getHistoryFromLS = async () => {
    const configFromLS = await getStorageValue(storageNamespaces.LOCAL, storageKeys.CONFIG)
    const historyFromLS = await getStorageValue(storageNamespaces.SESSION, storageKeys.HISTORY)

    history = historyFromLS || []
    context = getConfigValueByInputId(configInputIds.CONTEXT, configFromLS, '')
  }

  const setHistoryFromLS = value => {
    setStorageValue(storageNamespaces.SESSION, storageKeys.HISTORY, value)
  }

  const getContext = tab => {
    return createContext(context, tab)
  }

  getHistoryFromLS()
  chrome.storage.onChanged.addListener(handleStorageChanges)

  return {
    getHistory: () => history,
    setHistory: setHistoryFromLS,
    getContext
  }
})()

export default historyManager
