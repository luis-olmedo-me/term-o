import storage from '@src/libs/storage'
import { useCallback, useEffect, useState } from 'preact/hooks'

export const useStorage = ({ key }) => {
  const defaultValue = storage.get(key)
  const [state, setState] = useState(defaultValue)

  useEffect(
    function expectStorageChanges() {
      const handleStorageChanges = updatedStorage => {
        const newState = updatedStorage.get(key)

        setState(newState)
      }

      storage.addEventListener(key, handleStorageChanges)

      return () => storage.removeEventListener(key, handleStorageChanges)
    },
    [key]
  )

  const setStateInStorage = useCallback(
    async value => {
      setState(oldState => {
        const validatedValue = typeof value === 'function' ? value(oldState) : value

        storage.set(key, validatedValue)

        return validatedValue
      })
    },
    [key]
  )

  return [state, setStateInStorage]
}
