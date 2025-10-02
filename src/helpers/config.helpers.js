export const getConfigValueByInputId = (inputId, configSections, defaultValue = null) => {
  for (const section of configSections) {
    for (const input of section.inputs) {
      if (input.id === inputId) return input.value
    }
  }

  return defaultValue
}

export const mergeConfigSections = (configSectionsA, configSectionsB) => {
  return configSectionsA.map(sectionA => {
    const sectionB = configSectionsB.find(section => section.id === sectionA.id)

    return {
      ...sectionB,
      inputs: sectionA.inputs.map(inputA => {
        const inputB = sectionB.inputs.find(input => input.id === inputA.id)

        return {
          ...inputA,
          ...inputB
        }
      })
    }
  })
}
