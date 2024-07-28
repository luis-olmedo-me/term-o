import { useCallback } from 'preact/hooks'

import useStorage from '@src/hooks/useStorage'
import { defaultConfigValues } from './useConfig.constants'

export const useConfig = () => {
  const [config, setConfig] = useStorage({
    namespace: 'local',
    key: 'config',
    defaultValue: defaultConfigValues
  })

  const getConfigById = useCallback(
    (sectionId, inputId) => {
      const section = config.find(section => section.id === sectionId)

      if (!section) return null

      return section.inputs.find(input => input.id === inputId)
    },
    [config]
  )

  return { config, setConfig, getConfigById }
}
