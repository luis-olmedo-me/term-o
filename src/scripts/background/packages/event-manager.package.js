import { getStorageValue } from '@src/libs/command-parser/handlers'

const eventManager = (function() {
  let values = []

  const handleStorageChanges = (changes, currentChanges) => {
    if (currentChanges !== 'local') return

    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === 'events') {
        values = newValue
      }
    }
  }

  const getUserEventsFromLS = async () => {
    const events = await getStorageValue('local', 'events')

    values = events || []
  }

  getUserEventsFromLS()
  chrome.storage.onChanged.addListener(handleStorageChanges)

  return { getEvents: () => values }
})()

export default eventManager
