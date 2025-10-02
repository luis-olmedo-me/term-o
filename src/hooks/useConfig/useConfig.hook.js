import { useCallback, useMemo } from 'preact/hooks'

import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import { getConfigValueByInputId, mergeConfigSections } from '@src/helpers/config.helpers'
import useStorage from '@src/hooks/useStorage'
import { defaultConfigSections } from './useConfig.constants'

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
      const newConfig = validatedConfig.map(section => {
        const inputs = section.inputs.map(input => {
          return input.id === inputId ? { ...input, value: newValue } : input
        }, {})

        return section.id === sectionId ? { ...section, inputs } : section
      })

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
