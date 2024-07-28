import { useCallback } from 'preact/hooks'

import useStorage from '@src/hooks/useStorage'
import { configSections } from './useConfig.constants'

export const useConfig = () => {
  const [config, setConfig] = useStorage({
    namespace: 'local',
    key: 'config',
    defaultValue: configSections
  })

  const getConfigById = useCallback(
    (sectionId, inputId) => {
      const section = config.find(section => section.id === sectionId)

      if (!section) return null

      return section.inputs.find(input => input.id === inputId)
    },
    [config]
  )

  const changeConfig = useCallback(
    (sectionId, inputId, newValue) => {
      const newConfig = config.map(section => {
        const inputs = section.inputs.map(input => {
          return input.id === inputId ? { ...input, value: newValue } : input
        }, {})

        return section.id === sectionId ? { ...section, inputs } : section
      })

      setConfig(newConfig)
    },
    [config]
  )

  return {
    config,
    getConfigById,
    changeConfig
  }
}
