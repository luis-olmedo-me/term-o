import commandParser from 'minimist'

const decodeStringValue = (value) => {
  return decodeURI(value).replace(/^"|"$/g, '')
}

export const parseArgsIntoCommands = (args) => {
  const line = args
    .join(' ')
    .replace(/"(\w|\s|-)+"/g, encodeURI)
    .split(' ')

  const object = commandParser(line)

  return Object.entries(object).reduce((parsedObject, [key, value]) => {
    const valueType = typeof value
    const isObject = typeof value === 'object'

    const objectValidatedType = Array.isArray(value) ? 'array' : valueType
    const validatedValueType = isObject ? objectValidatedType : valueType

    switch (validatedValueType) {
      case 'string':
        return {
          ...parsedObject,
          [key]: decodeStringValue(value)
        }

      case 'array':
        return {
          ...parsedObject,
          [key]: value?.map(decodeStringValue)
        }

      default:
        return {
          ...parsedObject,
          [key]: value
        }
    }
  }, {})
}
