import { useCallback, useEffect, useState } from 'preact/hooks'

export const useStorage = ({ namespace, key, defaultValue }) => {
  const [state, setState] = useState(defaultValue)

  useEffect(
    function expectStorageChanges() {
      const handleStorageChanges = (changes, currentChanges) => {
        if (currentChanges !== namespace) return

        for (let [storageKey, { newValue }] of Object.entries(changes)) {
          if (storageKey === key) setState(newValue)
        }
      }

      const updateState = async () => {
        const data = await chrome.storage.local.get(key)
        const newValue = data[key]
        const hasValue = typeof newValue !== 'undefined'

        setState(hasValue ? newValue : defaultValue)
      }

      updateState()
      chrome.storage.onChanged.addListener(handleStorageChanges)

      return () => chrome.storage.onChanged.removeListener(handleStorageChanges)
    },
    [namespace, key]
  )

  const setStateInStorage = useCallback(
    async value => {
      const validatedValue = typeof value === 'function' ? value(state) : value

      await chrome.storage[namespace].set({ [key]: validatedValue })
    },
    [namespace, key]
  )

  return [state, setStateInStorage]
}
