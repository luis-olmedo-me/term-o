import { getQuotedString } from '@src/helpers/utils.helpers'
import { getColor as C } from '@src/theme/theme.helpers'
import { errorMessagesOverwritten } from './command-helpers.constants'

export const prependCounters = array => {
  const counters = array.reduce((results, value) => {
    const oldValue = results[value] || 0

    return { ...results, [value]: oldValue + 1 }
  }, {})

  return Object.entries(counters).map(([value, count]) => `${count} ${value}`)
}

export const renameError = error => {
  const replacement = errorMessagesOverwritten.find(message => message.original.test(error))

  throw replacement ? replacement.new : error
}

export const formatElement = ({ tagName, attributes, xpath }) => {
  if (xpath !== null) return `${C`yellow`}${getQuotedString(xpath)}`

  const attrs = Object.entries(attributes)
    .map(([name, value]) => {
      const attrName = `${C`green`}${getQuotedString(name)}`
      const attrValue = value ? ` ${C`yellow`}${getQuotedString(value)}` : ''

      return `${C`purple`}[${attrName}${attrValue}${C`purple`}]`
    })
    .join(' ')

  const quotedTagName = getQuotedString(tagName)

  return attrs ? `${C`red`}${quotedTagName} ${attrs}` : `${C`red`}${quotedTagName}`
}
