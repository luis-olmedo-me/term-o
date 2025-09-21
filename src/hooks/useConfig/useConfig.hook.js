import { useCallback, useMemo } from 'preact/hooks'

import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import useStorage from '@src/hooks/useStorage'
import { configSections } from './useConfig.constants'

export const useConfig = props => {
  const { get = [] } = props || {}

  const [config, setConfig] = useStorage({
    namespace: storageNamespaces.LOCAL,
    key: storageKeys.CONFIG,
    defaultValue: configSections
  })

  const validatedConfig = useMemo(() => {
    return configSections.map(section => {
      const lsSection = config.find(lsSection => lsSection.id === section.id)

      return lsSection
        ? {
            ...lsSection,
            inputs: section.inputs.map(input => {
              return lsSection.inputs.find(lsInput => lsInput.id === input.id) || input
            })
          }
        : section
    })
  }, [config])

  const getConfigById = useCallback(
    inputId => {
      for (const section of validatedConfig) {
        for (const input of section.inputs) {
          if (input.id === inputId) return input.value
        }
      }

      return null
    },
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
