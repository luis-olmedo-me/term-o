import { getColor as C } from '@src/theme/theme.helpers'

export const isRegExp = value => {
  if (Array.isArray(value)) return value.forEach(isRegExp)

  try {
    new RegExp(value)
  } catch (error) {
    throw `"${C`bright-red`}${value}${C`red`}" is not a valid regular expression.`
  }
}

export const isURL = value => {
  if (Array.isArray(value)) return value.forEach(isURL)

  try {
    new URL(value)
  } catch (error) {
    throw `"${C`bright-red`}${value}${C`red`}" is not a valid URL.`
  }
}
