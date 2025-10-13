import { useCallback, useMemo } from 'preact/hooks'

import { defaultConfig } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import {
  buildDetailedConfig,
  getConfigValueByInputId,
  updateConfigValueIn
} from '@src/helpers/config.helpers'
import useStorage from '@src/hooks/useStorage'

export const useConfig = () => {
  const [config, setConfig] = useStorage({ key: storageKeys.CONFIG })

  const detailedConfig = useMemo(() => buildDetailedConfig(config), [config])

  const change = useCallback(
    (inputId, newValue) => {
      const newConfig = updateConfigValueIn(config, inputId, newValue)

      setConfig(newConfig)
    },
    [config]
  )

  const reset = () => {
    setConfig(defaultConfig)
  }

  return {
    get: inputId => getConfigValueByInputId(config, inputId),
    details: detailedConfig,
    change,
    reset
  }
}
