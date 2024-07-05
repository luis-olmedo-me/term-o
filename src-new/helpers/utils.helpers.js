export const debounce = (callback, wait) => {
  let timerId

  return (...args) => {
    clearTimeout(timerId)

    timerId = setTimeout(() => callback(...args), wait)
  }
}

export const createUUIDv4 = () => {
  const uuidTemplate = '10000000-1000-4000-8000-100000000000'

  return uuidTemplate.replace(/[018]/g, character => {
    const randomValue = crypto.getRandomValues(new Uint8Array(1))[0]
    const newValue = character === '0' ? randomValue & 0x0f : (randomValue & 0x3) | 0x8

    return newValue.toString(16)
  })
}

export const delay = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}

export const isValidType = (value, type) => {
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

export const validateSchema = (value, schema) => {
  for (let key in schema) {
    if (!schema.hasOwnProperty(key)) continue
    if (!value.hasOwnProperty(key)) {
      return { isValid: false, error: `it is missing property '${key}' in object.` }
    }

    const expectedType = schema[key]
    const supposedValue = value[key]

    if (typeof expectedType === 'string') {
      if (!isValidType(supposedValue, expectedType)) {
        return {
          isValid: false,
          error: `the value of "${key}" does not match type "${expectedType}".`
        }
      }

      continue
    }

    if (Array.isArray(expectedType)) {
      if (!Array.isArray(supposedValue)) {
        return {
          isValid: false,
          error: `the property "${key}" should be an array according to the schema.`
        }
      }

      const firstExpectedType = expectedType[0]

      const isValid = supposedValue.every(item => isValidType(item, firstExpectedType))
      if (!isValid) {
        return {
          isValid: false,
          error: `the element "${value[key]}" does not match type "${expectedType[0]}".`
        }
      }

      continue
    }

    if (typeof expectedType === 'object') {
      const validation = validateSchema(supposedValue, expectedType)

      if (!validation.isValid) return validation
      continue
    }

    return { isValid: false, error: `Unrecognized type for '${key}'.` }
  }

  return { isValid: true, error: null }
}
