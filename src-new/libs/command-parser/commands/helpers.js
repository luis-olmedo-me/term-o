import { getColor as C } from '@src/theme/theme.helpers'

export const isRegExp = (option, value) => {
  if (Array.isArray(value)) return value.forEach(isRegExp)

  try {
    new RegExp(value)
  } catch (error) {
    const name = option.displayName

    throw `${C`bright-red`}${name}${C`red`} expects a valid regular expression. Instead, it received ${C`bright-red`}"${value}"${C`red`}.`
  }
}

export const isXpath = (option, value) => {
  if (Array.isArray(value)) return value.forEach(isXpath)

  try {
    window.document.evaluate(value, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue
  } catch (error) {
    const name = option.displayName

    throw `${C`bright-red`}${name}${C`red`} expects a valid XPath. Instead, it received ${C`bright-red`}"${value}"${C`red`}.`
  }
}

export const isURL = (option, value) => {
  if (Array.isArray(value)) return value.forEach(isURL)

  try {
    new URL(value)
  } catch (error) {
    const name = option.displayName

    throw `${C`bright-red`}${name}${C`red`} expects a valid URL. Instead, it received ${C`bright-red`}"${value}"${C`red`}.`
  }
}

export const isInRange = (min, max) => {
  return (option, value) => {
    const isValid = value.length >= min && value.length <= max

    if (!isValid) {
      const name = option.displayName
      const count = value.length

      throw `${C`bright-red`}${name}${C`red`}expects between ${min} and ${max} value(s). Instead, it received ${C`bright-red`}${count}${C`red`}.`
    }
  }
}
