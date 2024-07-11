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

export const getNumberTabId = tabIdRaw => {
  const tabIdString = tabIdRaw.replace(/^T/, '')

  return Number(tabIdString)
}

export const formatElement = ({ tagName, attributes, xpath, textContent, tabId }) => {
  const quotedTabId = tabId ? `${C`blue`}${getQuotedString(tabId)} ` : ''
  if (xpath !== null) return `${quotedTabId}${C`yellow`}${getQuotedString(xpath)}`
  if (textContent !== null) return `${quotedTabId}${C`yellow`}${getQuotedString(textContent)}`

  const attrs = Object.entries(attributes)
    .map(([name, value]) => {
      const attrName = `${C`green`}${getQuotedString(name)}`
      const attrValue = value ? ` ${C`yellow`}${getQuotedString(value)}` : ''

      return `${C`purple`}[${attrName}${attrValue}${C`purple`}]`
    })
    .join(' ')

  const quotedTagName = getQuotedString(tagName)

  return attrs
    ? `${quotedTabId}${C`red`}${quotedTagName} ${attrs}`
    : `${quotedTabId}${C`red`}${quotedTagName}`
}

export const formatEvent = ({ name, target, tabId }) => {
  const quotedTabId = tabId ? `${C`blue`}${getQuotedString(tabId)} ` : ''
  const quotedName = getQuotedString(name)
  const quotedTarget = getQuotedString(target)

  return `${quotedTabId}${C`purple`}${quotedName} ${C`yellow`}${quotedTarget}`
}
