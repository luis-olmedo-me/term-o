import { useCallback } from 'preact/hooks'

import { debounce } from '@src/helpers/utils.helpers'

export const useDebouncedCallback = (callback, dependencies, time) => {
  const uniqueCallback = useCallback(callback, dependencies)
  const uniqueCallbackDebounced = useCallback(debounce(uniqueCallback, time), [
    uniqueCallback,
    time
  ])

  return uniqueCallbackDebounced
}
