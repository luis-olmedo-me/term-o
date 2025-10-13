import { configDefaultValues, defaultConfigSections } from '@src/constants/config.constants'

export const getConfigValueByInputId = (config, inputId) => {
  const defaultValue = configDefaultValues[inputId]
  const foundInput = config[inputId]

  if (typeof foundInput !== 'undefined') return foundInput

  return defaultValue
}

export const buildDetailedConfig = simplifiedConfig => {
  return defaultConfigSections.map(defaultSection => {
    return {
      ...defaultSection,
      inputs: defaultSection.inputs.map(defaultInput => {
        const preferedValue = simplifiedConfig[defaultInput.id]

        return {
          ...defaultInput,
          value: typeof preferedValue === 'undefined' ? defaultInput.value : preferedValue
        }
      })
    }
  })
}

export const updateConfigValueIn = (config, inputId, newValue) => {
  return { ...config, [inputId]: newValue }
}

export const simplifyConfig = config => {
  return config.reduce((simplifiedConfig, section) => {
    const sectionInputValues = section.inputs.reduce(
      (simplifiedInputs, input) => ({ ...simplifiedInputs, [input.id]: input.value }),
      {}
    )

    return {
      ...simplifiedConfig,
      ...sectionInputValues
    }
  }, {})
}
