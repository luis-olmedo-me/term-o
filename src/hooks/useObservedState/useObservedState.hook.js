import { useCallback, useEffect, useState } from 'preact/hooks'

export const useObservedState = (value, dependencies) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(function listenChanges() {
    setLocalValue(value)
  }, dependencies)

  const resetLocalValue = useCallback(() => setLocalValue(value), dependencies)

  return [localValue, setLocalValue, resetLocalValue]
}
