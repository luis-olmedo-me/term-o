import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
import { configIds, configInputIds } from '@src/hooks/useConfig'
import { namespaces } from '@src/hooks/useStorage'
import {
  getStorageValue,
  setStorageValue
} from '@src/libs/command-parser/handlers/storage/storage.helpers'

const historyManager = (function() {
  let history = []
  let status = ''

  const handleStorageChanges = (changes, currentChanges) => {
    if (currentChanges !== namespaces.LOCAL) return

    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === storageKeys.HISTORY) {
        history = newValue
      }
    }
  }

  const getHistoryFromLS = async () => {
    const configFromLS = await getStorageValue(namespaces.LOCAL, storageKeys.CONFIG)
    const historyFromLS = await getStorageValue(namespaces.LOCAL, storageKeys.HISTORY)

    const promptConfig = configFromLS?.find(config => config.id === configIds.PROMPT)
    const statusInputConfig = promptConfig?.inputs.find(input => input.id === configInputIds.STATUS)

    history = historyFromLS || []
    status = statusInputConfig?.value || ''
  }

  const setHistoryFromLS = async value => {
    setStorageValue(namespaces.LOCAL, storageKeys.HISTORY, value)
  }

  const getContext = async tab => {
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
