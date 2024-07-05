import { getColor as C } from '@src/theme/theme.helpers'

const isValidType = (value, type) => {
  switch (type) {
    case 'string':
      return typeof value === 'string'
    case 'number':
      return typeof value === 'number' && isFinite(value)
    case 'array':
      return Array.isArray(value)
    default:
      return false
  }
}

export const validateSchema = (option, value, schema) => {
  const name = option.displayName

  for (let key in schema) {
    if (!schema.hasOwnProperty(key)) continue

    if (!value.hasOwnProperty(key))
      throw `${C`brightRed`}${name}${C`red`} expects a valid JSON. Instead, it is missing property ${C`brightRed`}"${key}"${C`red`} in object.`

    const expectedType = schema[key]
    const supposedValue = value[key]

    const shouldBeString = typeof expectedType === 'string'
    const shouldBeArray = Array.isArray(expectedType)

    if (shouldBeString) {
      if (!isValidType(supposedValue, expectedType))
        throw `${C`brightRed`}${name}${C`red`} expects a valid JSON. Instead, the value of ${C`brightRed`}"${key}"${C`red`} does not match type ${C`brightRed`}"${expectedType}"${C`red`}.`

      continue
    }

    if (shouldBeArray) {
      const isArray = Array.isArray(supposedValue)

      if (!isArray)
        throw `${C`brightRed`}${name}${C`red`} expects a valid JSON. Instead, the property ${C`brightRed`}"${key}"${C`red`} should be an array according to the schema.`

      const firstExpectedType = expectedType[0]
      const isValid = supposedValue.every(item => isValidType(item, firstExpectedType))

      if (!isValid)
        throw `${C`brightRed`}${name}${C`red`} expects a valid JSON. Instead, the element ${C`brightRed`}"${supposedValue}"${C`red`} does not match type ${C`brightRed`}"${firstExpectedType}"${C`red`}.`

      continue
    }

    if (typeof expectedType === 'object') {
      validateSchema(option, supposedValue, expectedType)
      continue
    }

    throw `${C`brightRed`}${name}${C`red`} expects a valid JSON. Instead, the type for "${key}" is unrecognized.`
  }
}
