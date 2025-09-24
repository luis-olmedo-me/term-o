import { getQuotedString } from '@src/helpers/utils.helpers'
import { getColor as C } from '@src/libs/themer'
import { errorMessagesOverwritten } from './handlers.constants'

export const spreadIf = (condition, value) => {
  return condition ? value : {}
}

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
  let helps = []
  let helps1 = []
  const options = command.options
  const helpSectionsNames = Object.keys(command.helpSectionTitles)
  const optionsWithDependencies = options.getDependencies()

  helpSectionsNames.forEach(sectionName => {
    const optionsBySection = options.getByHelpSection(sectionName)
    const sectionTitle = command.helpSectionTitles[sectionName]

    helps.push(`${C`foreground`}${sectionTitle}:\n`)

    optionsBySection.forEach((option, index) => {
      const displayName = option.displayName
      const description = option.description

      const isLastOption = index === optionsBySection.length - 1
      const lineJump = isLastOption ? '\n' : ''

      helps.push(`\t${C`cyan`}${displayName}\t${C`foreground`}${description}${lineJump}`)
    })

    helps.push('')
  })

  const dependencies = Object.values(optionsWithDependencies).flat()
  const optionsIndependents = options.values.filter(
    option => !option.dependencies && !dependencies.includes(option.name)
  )

  Object.entries(optionsWithDependencies).forEach(([name, dependencies], mainIndex) => {
    const option = options.getByName(name)
    const displayName = getQuotedString(option.displayName)
    const description = getQuotedString(option.description)
    const formattedMainIndex = mainIndex.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })

    helps1.push(
      `${C`cyan`}${formattedMainIndex} ${C`brightBlack`}null ${C`purple`}${displayName} ${C`yellow`}${description}`
    )

    dependencies.forEach((dependencyName, index) => {
      const dependencyOption = options.getByName(dependencyName)
      const displayName = getQuotedString(dependencyOption.displayName)
      const description = getQuotedString(dependencyOption.description)
      const formattedIndex = index.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })

      helps1.push(
        `${C`brightBlack`}null ${C`cyan`}${formattedIndex} ${C`brightPurple`}${displayName} ${C`yellow`}${description}`
      )
    })
  })

  optionsIndependents.forEach(option => {
    const displayName = option.displayName

    helps1.push(`${displayName}: ${option.description}`)
  })

  command.update(...helps)
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

export const formatDOMEvent = ({ name, target, tabId }) => {
  const quotedTabId = tabId ? `${C`blue`}${getQuotedString(tabId)} ` : ''
  const quotedName = getQuotedString(name)
  const quotedTarget = getQuotedString(target)

  return `${quotedTabId}${C`purple`}${quotedName} ${C`yellow`}${quotedTarget}`
}

export const formatText = ({ text }) => {
  const quotedText = getQuotedString(text)

  return `${C`yellow`}${quotedText}`
}

export const formatError = ({ title }) => {
  return `${C`red`}${title}`
}

export const formatStorageProp = ({ key, value, tabId }) => {
  const quotedTabId = tabId ? `${C`blue`}${getQuotedString(tabId)} ` : ''
  const quotedKey = getQuotedString(key)
  const quotedValue = getQuotedString(value)

  return `${quotedTabId}${C`purple`}${quotedKey} ${C`yellow`}${quotedValue}`
}

export const formatResponse = ({ response, responseBody, method }) => {
  const quotedURL = getQuotedString(response.url)
  const status = response.status

  const responseBodyString = JSON.stringify(responseBody)
  const quotedResponseBody = getQuotedString(responseBodyString)
  const quotedMethod = getQuotedString(method)

  return `${C`cyan`}${status} ${C`green`}${quotedMethod} ${C`brightYellow`}${quotedURL} ${C`yellow`}${quotedResponseBody}`
}

export const formatStorageAsString = ({ storage, tabId }) => {
  const quotedTabId = tabId ? `${C`blue`}${getQuotedString(tabId)} ` : ''
  const stringStorage = JSON.stringify(storage)
  const quotedStorage = getQuotedString(stringStorage)

  return `${quotedTabId}${C`yellow`}${quotedStorage}`
}

export const formatAlias = ({ key, value }) => {
  const quotedKey = getQuotedString(key)
  const quotedValue = getQuotedString(value)

  return `${C`purple`}${quotedKey} ${C`yellow`}${quotedValue}`
}
export const formatFile = ({ name }) => {
  const quotedName = getQuotedString(name)

  return `${C`purple`}${quotedName} `
}

export const formatEvent = ({ url, line, id }) => {
  const quotedId = getQuotedString(id)
  const quotedURL = getQuotedString(url)
  const quotedLine = getQuotedString(line)

  return `${C`purple`}${quotedId} ${C`yellow`}${quotedURL} ${quotedLine}`
}

export const formatTab = ({ windowId, id, title, url }) => {
  const quotedWindowId = getQuotedString(`W${windowId}`)
  const quotedId = getQuotedString(`T${id}`)
  const quotedTitle = getQuotedString(title)
  const quotedURL = getQuotedString(url)

  return `${C`purple`}${quotedWindowId} ${C`blue`}${quotedId} ${C`brightYellow`}${quotedTitle} ${C`yellow`}${quotedURL}`
}

export const formatHistoryItem = ({ url, title, lastVisitTime }) => {
  const dateTime = new Date(lastVisitTime).toISOString()

  const quotedDateTime = getQuotedString(dateTime)
  const quotedTitle = getQuotedString(title)
  const quotedURL = getQuotedString(url)

  return `${C`green`}${quotedDateTime} ${C`brightYellow`}${quotedTitle} ${C`yellow`}${quotedURL}`
}

export const formatTheme = ({ name }) => {
  const quotedName = getQuotedString(name)

  return `${C`purple`}${quotedName}`
}

export const formatScript = ({ name }) => {
  const quotedName = getQuotedString(name)

  return `${C`brightPurple`}${quotedName}`
}

export const formatRule = ({ styles, selector }) => {
  const quotedSelector = getQuotedString(selector)

  const css = styles
    .map(([name, value]) => {
      const coloredName = `${C`green`}${getQuotedString(name)}`
      const coloredValue = value ? ` ${C`yellow`}${getQuotedString(value)}` : ''

      return `${C`purple`}[${coloredName}${coloredValue}${C`purple`}]`
    })
    .join(' ')

  return css ? `${C`cyan`}${quotedSelector} ${css}` : `${C`cyan`}${quotedSelector}`
}
