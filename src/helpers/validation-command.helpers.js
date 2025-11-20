import { validateSchema } from '@src/helpers/validation-schema'

export const isRegExp = (option, value) => {
  try {
    new RegExp(value)
  } catch (error) {
    const name = option.displayName

    throw `${name} expects a valid regular expression. Instead, it received "${value}".`
  }
}

export const isDate = (option, value) => {
  const date = new Date(value)

  if (date === 'Invalid Date' || isNaN(date)) {
    const name = option.displayName

    throw `${name} expects a valid Date value. Instead, it received "${value}".`
  }
}

export const isJSON = (option, value) => {
  try {
    JSON.parse(value)
  } catch (error) {
    const name = option.displayName

    throw `${name} expects a valid JSON. Instead, it received "${value}".`
  }
}

export const isJSONScheme = scheme => {
  return (option, value) => {
    isJSON(option, value)

    const parsedValue = JSON.parse(value)

    validateSchema(option, scheme, parsedValue)
  }
}

const xpathPattern = /^\/?\/?(?:id\("[^"]+"\)|[a-zA-Z0-9_-]+)(?:\[[0-9]+\])?(?:\/(?:id\("[^"]+"\)|[a-zA-Z0-9_-]+)(?:\[[0-9]+\])?)*$/
export const isXpath = (option, value) => {
  if (!xpathPattern.test(value)) {
    const name = option.displayName

    throw `${name} expects a valid XPath. Instead, it received "${value}".`
  }
}

const tabIdPattern = /T(\d)+/
export const isTabId = (option, value) => {
  if (!tabIdPattern.test(value)) {
    const name = option.displayName

    throw `${name} expects a valid tab id. Instead, it received "${value}".`
  }
}

export const isURL = (option, value) => {
  try {
    new URL(value)
  } catch (error) {
    const name = option.displayName

    throw `${name} expects a valid URL. Instead, it received "${value}".`
  }
}

export const isStringLike = validValues => {
  return (option, value) => {
    if (!validValues.includes(value)) {
      const name = option.displayName
      const availableValues = validValues.map(val => `"${val}"`).join(' | ')

      throw `${name} expects one of the following values: ${availableValues}. Instead, it received "${value}".`
    }
  }
}

export const isPositive = (option, value) => {
  if (value <= 0) {
    const name = option.displayName

    throw `${name} expects a positive value. Instead, it received "${value}".`
  }
}

export const isInteger = (option, value) => {
  if (value % 1 !== 0 || isNaN(value)) {
    const name = option.displayName

    throw `${name} expects an integer value. Instead, it received "${value}".`
  }
}

export const isSpaceForbidden = (option, value) => {
  if (value.includes(' ')) {
    const name = option.displayName

    throw `${name} expects a value without space characters. Instead, it received "${value}".`
  }
}

export const isInlineStyles = (option, value) => {
  const validPropertyName = /^-?\w+$/
  const validPropertyValue = /^[\w\s.%#()-]+$/

  const stylesArray = value.split(';')

  for (const style of stylesArray) {
    const trimmedStyle = style.trim()

    if (trimmedStyle === '') continue

    const [propName, propValue] = trimmedStyle.split(':').map(part => part?.trim())
    const isMissingContent = propName === '' || propValue === ''
    const isInvalidPropName = !validPropertyName.test(propName)
    const isInvalidPropValue = !validPropertyValue.test(propValue)

    if (isMissingContent || isInvalidPropName || isInvalidPropValue) {
      const name = option.displayName

      throw `${name} expects valid inline styles. Instead, it received "${value}".`
    }
  }
}

export const hasInlineHeaders = (option, values) => {
  values.forEach(value => {
    const name = option.displayName

    const trimmedHeader = value.trim()

    if (trimmedHeader === '' || !value.includes(':'))
      throw `${name} must follow this pattern "name: value". Instead, it received "${value}".`

    const [propName, propValue] = trimmedHeader.split(':').map(part => part?.trim())
    const isMissingContent = propName === '' || propValue === ''
    const isInvalidPropName = propName.includes(' ')

    if (isMissingContent || isInvalidPropName) {
      throw `${name} expects valid inline header. Instead, it received "${value}".`
    }
  })
}

export const hasLength = staticLength => {
  return (option, value) => {
    const isValid = value.length === staticLength

    if (!isValid) {
      const name = option.displayName
      const count = value.length

      throw `${name}expects ${staticLength} value(s). Instead, it received ${count}.`
    }
  }
}

export const hasLengthBetween = (min, max) => {
  return (option, value) => {
    const isValid = value.length >= min && value.length <= max

    if (!isValid) {
      const name = option.displayName
      const count = value.length

      throw `${name}expects between ${min} and ${max} value(s). Instead, it received ${count}.`
    }
  }
}

export const hasItemAs = (index, validation) => {
  return (option, value) => {
    value.forEach((item, itemIndex) => {
      if (itemIndex === index) validation(option, item)
    })
  }
}

export const hasAllItemsAs = (...validations) => {
  return (option, value) => {
    value.forEach(item => {
      validations.forEach(validation => validation(option, item))
    })
  }
}
