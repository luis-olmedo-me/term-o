import { useCallback, useMemo } from 'preact/hooks'

import { defaultConfigSections } from '@src/constants/config.constants'
import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import {
  getConfigValueByInputId,
  mergeConfigSections,
  updateConfigValueIn
} from '@src/helpers/config.helpers'
import useStorage from '@src/hooks/useStorage'

export const useConfig = props => {
  const { get = [] } = props || {}

  const [config, setConfig] = useStorage({
    namespace: storageNamespaces.LOCAL,
    key: storageKeys.CONFIG,
    defaultValue: defaultConfigSections
  })

  const validatedConfig = useMemo(
    () => mergeConfigSections(defaultConfigSections, config),
    [config]
  )

  const getConfigById = useCallback(
    inputId => getConfigValueByInputId(inputId, validatedConfig),
    [validatedConfig]
  )

  const changeConfig = useCallback(
    (sectionId, inputId, newValue) => {
      const newConfig = updateConfigValueIn(validatedConfig, sectionId, inputId, newValue)

      setConfig(newConfig)
    },
    [validatedConfig]
  )

  const configListeners = useMemo(() => get.map(getConfigById), [getConfigById, validatedConfig])

  return {
    listening: configListeners,
    config: validatedConfig,
    getConfigById,
    changeConfig
  }
}
