import { useEffect } from 'preact/hooks'

export const useStorage = ({ namespace, key, onUpdate, onInit }) => {
  useEffect(
    function expectStorageChanges() {
      const handleStorageChanges = (changes, currentChanges) => {
        if (currentChanges !== namespace) return

        for (let [storageKey, change] of Object.entries(changes)) {
          if (storageKey === key) onUpdate(change)
        }
      }

      const updateState = async () => {
        const data = await chrome.storage.local.get(key)
        const value = data[key]

        if (typeof value === 'undefined') return

        onInit({ value })
      }

      updateState()
      chrome.storage.onChanged.addListener(handleStorageChanges)

      return () => chrome.storage.onChanged.removeListener(handleStorageChanges)
    },
    [namespace, key]
  )
}
