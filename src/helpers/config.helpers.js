export const getConfigValueByInputId = (inputId, configSections, defaultValue = null) => {
  for (const section of configSections) {
    for (const input of section.inputs) {
      if (input.id === inputId) return input.value
    }
  }

  return defaultValue
}
