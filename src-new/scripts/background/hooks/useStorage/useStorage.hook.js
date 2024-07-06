import { useEffect } from 'preact/hooks'

export const useStorage = ({ namespace, key, onUpdate, onInit, defaultValue }) => {
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
        let value = data[key]

        const hasValue = typeof value !== 'undefined'
        const hasDefaultValue = typeof defaultValue !== 'undefined'

        if (!hasValue && hasDefaultValue) {
          await chrome.storage[namespace].set({ [key]: defaultValue })
          value = defaultValue
        }

        onInit({ value })
      }

      updateState()
      chrome.storage.onChanged.addListener(handleStorageChanges)

      return () => chrome.storage.onChanged.removeListener(handleStorageChanges)
    },
    [namespace, key]
  )
}
