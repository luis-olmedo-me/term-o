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

export const displayHelp = command => {
  const options = command.options
  const optionsWithDependencies = options.getDependencies()

  const dependencies = Object.values(optionsWithDependencies).flat()
  const optionsIndependents = options.values.filter(
    option => !option.dependencies && !dependencies.includes(option.name)
  )

  let outputs = []

  Object.entries(optionsWithDependencies).forEach(([name, dependencies], mainIndex) => {
    const option = options.getByName(name)
    const displayName = getQuotedString(option.displayName)

    outputs.push(
      `${C`cyan`}${mainIndex} - ${C`purple`}${displayName} ${C`yellow`}${option.description}`
    )

    dependencies.forEach((dependencyName, index) => {
      const dependencyOption = options.getByName(dependencyName)
      const displayName = getQuotedString(dependencyOption.displayName)
      const description = getQuotedString(dependencyOption.description)

      outputs.push(
        `${C`cyan`}${mainIndex} ${index} ${C`brightPurple`}${displayName} ${C`yellow`}${description}`
      )
    })
  })

  optionsIndependents.forEach(option => {
    const displayName = option.displayName

    outputs.push(`${displayName}: ${option.description}`)
  })

  command.update(...outputs)
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
