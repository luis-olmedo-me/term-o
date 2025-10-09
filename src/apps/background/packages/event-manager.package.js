import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import { getStorageValue } from '@src/helpers/storage.helpers'

const eventManager = (function () {
  let values = []

  const handleStorageChanges = (changes, currentChanges) => {
    if (currentChanges !== storageNamespaces.LOCAL) return

    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === storageKeys.EVENTS) {
        values = newValue
      }
    }
  }

  const getUserEventsFromLS = async () => {
    const events = await getStorageValue(storageNamespaces.LOCAL, storageKeys.EVENTS)

    values = events || []
  }

  getUserEventsFromLS()
  chrome.storage.onChanged.addListener(handleStorageChanges)

  return { getEvents: () => values }
})()

export default eventManager
