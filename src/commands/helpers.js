import { schemaTypes } from '@src/constants/validation-schema.constants'

const isExpectedType = (value, expectedType) => {
  switch (expectedType) {
    case schemaTypes.STRING:
      return typeof value === 'string'
    case schemaTypes.NUMBER:
      return typeof value === 'number' && isFinite(value)
    case schemaTypes.ARRAY:
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
      throw `${name} expects a valid JSON. Instead, it is missing property "${key}" in object.`

    const expectedType = schema[key]
    const supposedValue = value[key]

    const shouldBeString = typeof expectedType === 'string'
    const shouldBeArray = Array.isArray(expectedType)

    if (shouldBeString) {
      if (!isExpectedType(supposedValue, expectedType))
        throw `${name} expects a valid JSON. Instead, the value of "${key}" does not match type "${expectedType}".`

      continue
    }

    if (shouldBeArray) {
      const isArray = Array.isArray(supposedValue)

      if (!isArray)
        throw `${name} expects a valid JSON. Instead, the property "${key}" should be an array according to the schema.`

      const firstExpectedType = expectedType[0]
      const isValid = supposedValue.every(item => isExpectedType(item, firstExpectedType))

      if (!isValid)
        throw `${name} expects a valid JSON. Instead, the element "${supposedValue}" does not match type "${firstExpectedType}".`

      continue
    }

    if (typeof expectedType === 'object') {
      validateSchema(option, supposedValue, expectedType)
      continue
    }

    throw `${name} expects a valid JSON. Instead, the type for "${key}" is unrecognized.`
  }

  const invalidKey = Object.keys(value).find(key => typeof schema[key] === 'undefined')

  if (invalidKey)
    throw `${name} expects a valid JSON. Instead, it received an value with unexpected key "${invalidKey}".`
}
