import { storageKeys } from '@src/constants/storage.constants'
import { namespaces } from '@src/hooks/useStorage'
import {
  getStorageValue,
  setStorageValue
} from '@src/libs/command-parser/handlers/storage/storage.helpers'

const historyManager = (function() {
  let values = []

  const handleStorageChanges = (changes, currentChanges) => {
    if (currentChanges !== namespaces.LOCAL) return

    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === storageKeys.HISTORY) {
        values = newValue
      }
    }
  }

  const getHistoryFromLS = async () => {
    const history = await getStorageValue(namespaces.LOCAL, storageKeys.HISTORY)

    values = history || []
  }

  const setHistoryFromLS = async value => {
    setStorageValue(namespaces.LOCAL, storageKeys.HISTORY, value)
  }

  getHistoryFromLS()
  chrome.storage.onChanged.addListener(handleStorageChanges)

  return { getHistory: () => values, setHistory: setHistoryFromLS }
})()

export default historyManager
