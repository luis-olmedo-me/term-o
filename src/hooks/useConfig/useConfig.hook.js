import { useCallback, useMemo } from 'preact/hooks'

import useStorage from '@src/hooks/useStorage'
import { configSections } from './useConfig.constants'

export const useConfig = props => {
  const { get = [] } = props || {}

  const [config, setConfig] = useStorage({
    namespace: 'local',
    key: 'config',
    defaultValue: configSections
  })

  const getConfigById = useCallback(
    inputId => {
      for (const section of config) {
        for (const input of section.inputs) {
          if (input.id === inputId) return input.value
        }
      }

      return null
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

  const configListeners = useMemo(() => get.map(getConfigById), [getConfigById, config])

  return {
    listening: configListeners,
    config,
    getConfigById,
    changeConfig
  }
}
