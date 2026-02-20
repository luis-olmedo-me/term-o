import { useEffect, useState } from 'preact/hooks'

import storage from '@src/libs/storage'

if (!storage.initiated) storage.init()

export const StorageProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(storage.initiated)

  useEffect(() => {
    const handleInit = updatedStorage => {
      if (updatedStorage.initiated) setIsReady(true)
    }

    if (storage.initiated) {
      return handleInit(storage)
    }

    storage.addEventListener('init', handleInit)

    return () => storage.removeEventListener('init', handleInit)
  }, [])

  return isReady && children
}

StorageProvider.propTypes = {
  value: Object,
  children: Array
}
