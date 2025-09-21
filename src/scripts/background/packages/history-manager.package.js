import { storageKeys } from '@src/constants/storage.constants'
import { namespaces } from '@src/hooks/useStorage'
import { getStorageValue } from '@src/libs/command-parser/handlers/storage/storage.helpers'

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

  const getUserEventsFromLS = async () => {
    const history = await getStorageValue(namespaces.LOCAL, storageKeys.HISTORY)

    values = history || []
  }

  getUserEventsFromLS()
  chrome.storage.onChanged.addListener(handleStorageChanges)

  return { getEvents: () => values }
})()

export default historyManager
