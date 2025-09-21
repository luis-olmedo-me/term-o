import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
import { configIds, configInputIds } from '@src/hooks/useConfig'
import {
  getStorageValue,
  setStorageValue
} from '@src/libs/command-parser/handlers/storage/storage.helpers'

const historyManager = (function() {
  let history = []
  let status = ''

  const getStatusFromConfig = config => {
    if (!config) return ''

    const promptConfig = config.find(config => config.id === configIds.PROMPT)
    const statusInputConfig = promptConfig?.inputs.find(input => input.id === configInputIds.STATUS)

    return statusInputConfig?.value
  }

  const handleStorageChanges = (changes, currentChanges) => {
    if (currentChanges !== storageNamespaces.LOCAL) return

    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === storageKeys.HISTORY) {
        history = newValue
      }
      if (storageKey === storageKeys.CONFIG) {
        status = getStatusFromConfig(newValue)
      }
    }
  }

  const getHistoryFromLS = async () => {
    const configFromLS = await getStorageValue(storageNamespaces.LOCAL, storageKeys.CONFIG)
    const historyFromLS = await getStorageValue(storageNamespaces.LOCAL, storageKeys.HISTORY)

    history = historyFromLS || []
    status = getStatusFromConfig(configFromLS)
  }

  const setHistoryFromLS = value => {
    setStorageValue(storageNamespaces.LOCAL, storageKeys.HISTORY, value)
  }

  const getContext = tab => {
    return createContext(status, tab)
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
