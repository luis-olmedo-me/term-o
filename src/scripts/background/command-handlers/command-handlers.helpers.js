import { getQuotedString } from '@src/helpers/utils.helpers'
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

  let helps = []

  Object.entries(optionsWithDependencies).forEach(([name, dependencies], mainIndex) => {
    const option = options.getByName(name)
    const displayName = getQuotedString(option.displayName)
    const formattedMainIndex = mainIndex.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })

    helps.push(`${formattedMainIndex} -- ${displayName} ${option.description}`)

    dependencies.forEach((dependencyName, index) => {
      const dependencyOption = options.getByName(dependencyName)
      const displayName = getQuotedString(dependencyOption.displayName)
      const description = getQuotedString(dependencyOption.description)
      const formattedIndex = index.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })

      helps.push(`${formattedMainIndex} ${formattedIndex} ${displayName} ${description}`)
    })
  })

  optionsIndependents.forEach(option => {
    const displayName = option.displayName

    helps.push(`${displayName}: ${option.description}`)
  })

  command.update(...helps)
}

export const formatElement = ({ tagName, attributes, xpath, textContent, tabId }) => {
  const quotedTabId = tabId ? `${getQuotedString(tabId)} ` : ''
  if (xpath !== null) return `${quotedTabId}${getQuotedString(xpath)}`
  if (textContent !== null) return `${quotedTabId}${getQuotedString(textContent)}`

  const attrs = Object.entries(attributes)
    .map(([name, value]) => {
      const attrName = `${getQuotedString(name)}`
      const attrValue = value ? ` ${getQuotedString(value)}` : ''

      return `[${attrName}${attrValue}]`
    })
    .join(' ')

  const quotedTagName = getQuotedString(tagName)

  return attrs ? `${quotedTabId}${quotedTagName} ${attrs}` : `${quotedTabId}${quotedTagName}`
}

export const formatDOMEvent = ({ name, target, tabId }) => {
  const quotedTabId = tabId ? `${getQuotedString(tabId)} ` : ''
  const quotedName = getQuotedString(name)
  const quotedTarget = getQuotedString(target)

  return `${quotedTabId}${quotedName} ${quotedTarget}`
}

export const formatStorageProp = ({ key, value }) => {
  const quotedKey = getQuotedString(key)
  const quotedValue = getQuotedString(value)

  return `${quotedKey} ${quotedValue}`
}
export const formatAlias = ({ key, value }) => {
  const quotedKey = getQuotedString(key)
  const quotedValue = getQuotedString(value)

  return `${quotedKey} ${quotedValue}`
}

export const formatEvent = ({ url, line, id }) => {
  const quotedId = getQuotedString(id)
  const quotedURL = getQuotedString(url)
  const quotedLine = getQuotedString(line)

  return `${quotedId} ${quotedURL} ${quotedLine}`
}

export const formatTab = ({ windowId, id, title, url }) => {
  const quotedWindowId = getQuotedString(`W${windowId}`)
  const quotedId = getQuotedString(`T${id}`)
  const quotedTitle = getQuotedString(title)
  const quotedURL = getQuotedString(url)

  return `${quotedWindowId} ${quotedId} ${quotedTitle} ${quotedURL}`
}

export const formatTheme = ({ name }) => {
  const quotedName = getQuotedString(name)

  return `${quotedName}`
}

export const formatRule = ({ styles, selector }) => {
  const quotedSelector = getQuotedString(selector)

  const css = styles
    .map(([name, value]) => {
      const coloredName = `${getQuotedString(name)}`
      const coloredValue = value ? ` ${getQuotedString(value)}` : ''

      return `[${coloredName}${coloredValue}]`
    })
    .join(' ')

  return css ? `${quotedSelector} ${css}` : `${quotedSelector}`
}
