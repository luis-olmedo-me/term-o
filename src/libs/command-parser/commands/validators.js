import { validateSchema } from './helpers'

export const isRegExp = (option, value) => {
  if (Array.isArray(value)) return value.forEach(isRegExp)

  try {
    new RegExp(value)
  } catch (error) {
    const name = option.displayName

    throw `${name} expects a valid regular expression. Instead, it received "${value}".`
  }
}

export const isJSON = (option, value) => {
  if (Array.isArray(value)) return value.forEach(isJSON)

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

export const isXpath = (option, value) => {
  if (Array.isArray(value)) return value.forEach(isXpath)

  try {
    window.document.evaluate(value, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue
  } catch (error) {
    const name = option.displayName

    throw `${name} expects a valid XPath. Instead, it received "${value}".`
  }
}

export const isURL = (option, value) => {
  if (Array.isArray(value)) return value.forEach(isURL)

  try {
    new URL(value)
  } catch (error) {
    const name = option.displayName

    throw `${name} expects a valid URL. Instead, it received "${value}".`
  }
}

export const hasNoSpaces = (option, value) => {
  if (Array.isArray(value)) return value.forEach(hasNoSpaces)

  if (value.includes(' ')) {
    const name = option.displayName

    throw `${name} expects a value without space characters. Instead, it received "${value}".`
  }
}

export const isInlineStyles = (option, value) => {
  if (Array.isArray(value)) return value.forEach(isInlineStyles)

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

export const hasItems = staticLength => {
  return (option, value) => {
    const isValid = value.length === staticLength

    if (!isValid) {
      const name = option.displayName
      const count = value.length

      throw `${name}expects ${staticLength} value(s). Instead, it received ${count}.`
    }
  }
}

export const isInRange = (min, max) => {
  return (option, value) => {
    const isValid = value.length >= min && value.length <= max

    if (!isValid) {
      const name = option.displayName
      const count = value.length

      throw `${name}expects between ${min} and ${max} value(s). Instead, it received ${count}.`
    }
  }
}

export const onItem = (index, validation) => {
  return (option, value) => {
    value.forEach((item, itemIndex) => {
      if (itemIndex === index) validation(option, item)
    })
  }
}
