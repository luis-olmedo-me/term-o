import { getBgColor as BG, getColor as C, escapeColors } from '@src/helpers/themes.helpers'
import { spreadIf } from '@src/helpers/utils.helpers'
import { isStrictDoubleQuoted, isStrictSingleQuoted, quotify } from './string.helpers'

export const formatTabId = ({ tabId }) => {
  const isString = typeof tabId === 'string'
  const isNumber = typeof tabId === 'number'

  if (isString) return [`${C`blue`}${quotify(tabId)}${C`reset`}`]
  if (isNumber) return [`${C`blue`}${quotify(`T${tabId}`)}${C`reset`}`]
  return []
}

export const formatElement = ({ tagName, attributes, xpath, textContent, tabId }) => {
  const hasXpath = xpath !== null
  const hasTextContent = textContent !== null

  const quotedXpath = hasXpath && quotify(xpath)
  const quotedTextContent = hasTextContent && quotify(textContent)

  if (hasXpath || hasTextContent) {
    return [
      ...formatTabId({ tabId }),
      ...spreadIf(hasXpath, [`${C`blue`}${quotedXpath}${C`reset`}`]),
      ...spreadIf(hasTextContent, [`${C`yellow`}${quotedTextContent}${C`reset`}`])
    ]
  }

  const attrs = attributes.map(([name, value]) => {
    const hasValue = Boolean(value)
    const quotedAttrName = quotify(name)
    const quotedAttrValue = hasValue && quotify(value)

    return [
      `${C`green`}${quotedAttrName}${C`reset`}`,
      ...spreadIf(hasValue, [`${C`yellow`}${quotedAttrValue}${C`reset`}`])
    ]
  })

  const quotedTagName = quotify(tagName)

  return [...formatTabId({ tabId }), `${C`red`}${quotedTagName}${C`reset`}`, ...attrs]
}

export const formatText = ({ text }) => {
  const quotedText = quotify(text)

  return [`${C`yellow`}${quotedText}${C`reset`}`]
}

export const formatNotification = ({ title, message }) => {
  const quotedTitle = quotify(title)
  const quotedMessage = quotify(message)

  return [`${C`brightYellow`}${quotedTitle}${C`reset`}`, `${C`yellow`}${quotedMessage}${C`reset`}`]
}

export const formatError = ({ title }) => {
  const cleanedTitle = escapeColors(title)
  const quotedTitle = quotify(cleanedTitle)

  return [`${C`red`}${quotedTitle}${C`reset`}`]
}

export const formatWarning = ({ title }) => {
  const quotedTitle = quotify(title)

  return [`${C`yellow`}${quotedTitle}${C`reset`}`]
}

export const formatStorageProp = ({ key, value, tabId }) => {
  const quotedKey = quotify(key)
  const quotedValue = quotify(value)

  return [
    ...formatTabId({ tabId }),
    `${C`purple`}${quotedKey}${C`reset`}`,
    `${C`yellow`}${quotedValue}${C`reset`}`
  ]
}

export const formatResponse = ({ response, responseBody, method }) => {
  const shouldStringify = typeof responseBody !== 'string' && responseBody !== null
  const quotedURL = quotify(response.url)
  const status = response.status

  const responseBodyString = shouldStringify ? JSON.stringify(responseBody) : responseBody
  const quotedResponseBody = quotify(responseBodyString)
  const quotedMethod = quotify(method)

  return [
    `${C`cyan`}${status}${C`reset`}`,
    `${C`green`}${quotedMethod}${C`reset`}`,
    `${C`brightYellow`}${quotedURL}${C`reset`}`,
    `${C`yellow`}${quotedResponseBody}${C`reset`}`
  ]
}

export const formatStorageAsString = ({ storage, tabId }) => {
  const stringStorage = JSON.stringify(storage)
  const quotedStorage = quotify(stringStorage)

  return [[...formatTabId({ tabId }), `${C`yellow`}${quotedStorage}${C`reset`}`]]
}

export const formatAlias = ({ key, value }) => {
  const quotedKey = quotify(key)
  const quotedValue = quotify(value)

  return [`${C`purple`}${quotedKey}${C`reset`}`, `${C`yellow`}${quotedValue}${C`reset`}`]
}

export const formatAddon = ({ name, version }) => {
  const quotedName = quotify(name)
  const quotedDateTime = quotify(version)

  return [`${C`green`}${quotedName}${C`reset`}`, `${C`cyan`}${quotedDateTime}${C`reset`}`]
}

export const formatRegisteredEvent = ({ type, url, line, id }) => {
  const quotedId = quotify(id)
  const quotedType = quotify(type)
  const quotedURL = quotify(url)
  const quotedLine = quotify(line)

  return [
    `${C`purple`}${quotedId}${C`reset`}`,
    `${C`green`}${quotedType}${C`reset`}`,
    `${C`yellow`}${quotedURL}${C`reset`}`,
    `${C`yellow`}${quotedLine}${C`reset`}`
  ]
}

export const formatDomEvent = ({ event, xpath }) => {
  const quotedEvent = quotify(event)
  const quotedXPath = quotify(xpath)

  return [`${C`purple`}${quotedEvent}${C`reset`}`, `${C`blue`}${quotedXPath}${C`reset`}`]
}

export const formatTab = ({ windowId, id, title, url, groupId }, staticUrl) => {
  const quotedWindowId = quotify(`W${windowId}`)
  const quotedGroupId = quotify(groupId !== -1 ? `G${groupId}` : '')
  const quotedTitle = quotify(title)
  const quotedURL = quotify(url || staticUrl)

  return [
    `${C`purple`}${quotedWindowId}${C`reset`}`,
    `${C`green`}${quotedGroupId}${C`reset`}`,
    ...formatTabId({ tabId: id }),
    `${C`brightYellow`}${quotedTitle}${C`reset`}`,
    `${C`yellow`}${quotedURL}${C`reset`}`
  ]
}

export const formatHistoryItem = ({ url, title, lastVisitTime }) => {
  const dateTime = new Date(lastVisitTime).toISOString()

  const quotedDateTime = quotify(dateTime)
  const quotedTitle = quotify(title)
  const quotedURL = quotify(url)

  return [
    `${C`green`}${quotedDateTime}${C`reset`}`,
    `${C`brightYellow`}${quotedTitle}${C`reset`}`,
    `${C`yellow`}${quotedURL}${C`reset`}`
  ]
}

export const formatTheme = ({ name }) => {
  const quotedName = quotify(name)

  return [`${C`purple`}${quotedName}${C`reset`}`]
}

export const formatStyle = ({ tagName, styles }) => {
  const quotedTagName = quotify(tagName)
  const quotedStyles = styles.reduce((styled, { prop, value }) => {
    const quotedProp = quotify(prop)
    const quotedValue = quotify(value)

    return [
      ...styled,
      [`${C`cyan`}${quotedProp}${C`reset`}`, `${C`yellow`}${quotedValue}${C`reset`}`]
    ]
  }, [])

  return [`${C`red`}${quotedTagName}${C`reset`}`, ...quotedStyles]
}

export const formatStringSearch = ({ query, input }) => {
  const match = input.replace(
    query,
    value => `${BG`red`}${C`brightWhite`}${value}${C`reset`}${BG`reset`}`
  )
  const hasSingleQuotes = isStrictSingleQuoted(match)
  const hasDoubleQuotes = isStrictDoubleQuoted(match)
  const quotedMatch = hasSingleQuotes || hasDoubleQuotes ? match : quotify(match)

  return [quotedMatch]
}

export const formatGap = ({ distanceX, distanceY }, xpathA, xpathB) => {
  const quotedDistanceX = quotify(`${distanceX}px`)
  const quotedDistanceY = quotify(`${distanceY}px`)
  const quotedXpathA = quotify(xpathA)
  const quotedXpathB = quotify(xpathB)

  return [
    `${C`brightYellow`}${quotedDistanceX}${C`reset`}`,
    `${C`brightYellow`}${quotedDistanceY}${C`reset`}`,
    `${C`blue`}${quotedXpathA}${C`reset`}`,
    `${C`blue`}${quotedXpathB}${C`reset`}`
  ]
}
