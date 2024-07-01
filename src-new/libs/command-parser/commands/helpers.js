import { getColor as C } from '@src/theme/theme.helpers'

export const isRegExp = value => {
  try {
    new RegExp(value)
  } catch (error) {
    throw `"${C`bright-red`}${value}${C`red`}" is not a valid regular expression.`
  }
}

export const isURL = value => {
  try {
    new URL(value)
  } catch (error) {
    throw `"${C`bright-red`}${value}${C`red`}" is not a valid URL.`
  }
}
