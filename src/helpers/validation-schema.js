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

    const isObject =
      typeof expectedType === 'object' && !isExpectedType(expectedType, schemaTypes.ARRAY)

    if (isObject) {
      validateSchema(option, supposedValue, expectedType)

      continue
    }

    if (!isExpectedType(supposedValue, expectedType)) {
      throw `${name} expects a valid JSON. Instead, the value of "${key}" does not match type "${expectedType}".`
    }
  }

  const invalidKey = Object.keys(value).find(key => typeof schema[key] === 'undefined')

  if (invalidKey)
    throw `${name} expects a valid JSON. Instead, it received an value with unexpected key "${invalidKey}".`
}
