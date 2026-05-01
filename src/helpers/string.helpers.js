import { countMatches } from './utils.helpers'

export const toTitleCase = value => {
  return value.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  )
}

export const insert = (value, index, insertion) => {
  return `${value.slice(0, index)}${insertion}${value.slice(index)}`
}

export const isSingleQuoted = value => {
  return value.startsWith("'") && value.endsWith("'")
}

export const isDoubleQuoted = value => {
  return value.startsWith('"') && value.endsWith('"')
}

export const isQuoted = value => {
  return isDoubleQuoted(value) || isSingleQuoted(value)
}

export const isArray = value => {
  return value.startsWith('[') && value.endsWith(']')
}

export const fillTemplate = (template, variables) => {
  return Object.entries(variables).reduce((output, [key, value]) => {
    return output.replaceAll(`{${key}}`, value)
  }, template)
}

export const isStrictSingleQuoted = value => {
  const quotePattern = /(?<!\\\\)'/g
  const quotesCount = countMatches(value, quotePattern)

  return isSingleQuoted(value) && quotesCount === 2
}

export const isStrictDoubleQuoted = value => {
  const quotePattern = /(?<!\\\\)"/g
  const quotesCount = countMatches(value, quotePattern)

  return isDoubleQuoted(value) && quotesCount === 2
}
