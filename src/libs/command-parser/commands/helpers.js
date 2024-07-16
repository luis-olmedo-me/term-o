import { getColor as C } from '../../../theme/theme.helpers'

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

export const validateSchema = (option, schema, value) => {
  const name = option.displayName

  for (let key in schema) {
    if (!(key in schema)) continue

    if (!(key in value))
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

    throw `${C`brightRed`}${name}${C`red`} expects a valid JSON. Instead, the type for ${C`brightRed`}"${key}"${C`red`} is unrecognized.`
  }

  const invalidKey = Object.keys(value).find(key => typeof schema[key] === 'undefined')

  if (invalidKey)
    throw `${C`brightRed`}${name}${C`red`} expects a valid JSON. Instead, it received an value with unexpected key ${C`brightRed`}"${invalidKey}"${C`red`}.`
}
