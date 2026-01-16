import { getBgColor as BG, getColor as C } from '@src/helpers/themes.helpers'
import { getQuotedString, spreadIf } from '@src/helpers/utils.helpers'

export const formatElement = ({ tagName, attributes, xpath, textContent, tabId }) => {
  const hasTabId = Boolean(tabId)
  const hasXpath = xpath !== null
  const hasTextContent = textContent !== null

  const quotedTabId = hasTabId && getQuotedString(tabId)
  const quotedXpath = hasXpath && getQuotedString(xpath)
  const quotedTextContent = hasTextContent && getQuotedString(textContent)

  if (hasXpath || hasTextContent) {
    return [
      ...spreadIf(hasXpath, [`${C`yellow`}${quotedXpath}`]),
      ...spreadIf(hasTextContent, [`${C`yellow`}${quotedTextContent}`])
    ]
  }

  const attrs = Object.entries(attributes).map(([name, value]) => {
    const hasValue = Boolean(value)
    const quotedAttrName = getQuotedString(name)
    const quotedAttrValue = hasValue && getQuotedString(value)

    return [
      `${C`green`}${quotedAttrName}`,
      ...spreadIf(hasValue, [`${C`yellow`}${quotedAttrValue}`])
    ]
  })

  const quotedTagName = getQuotedString(tagName)

  return [
    ...spreadIf(hasTabId, [`${C`blue`}${quotedTabId}`]),
    `${C`red`}${quotedTagName}`,
    ...attrs
  ]
}

export const formatText = ({ text }) => {
  const quotedText = getQuotedString(text)

  return [`${C`yellow`}${quotedText}`]
}

export const formatNotification = ({ title, message }) => {
  const quotedTitle = getQuotedString(title)
  const quotedMessage = getQuotedString(message)

  return [`${C`brightYellow`}${quotedTitle}`, `${C`yellow`}${quotedMessage}`]
}

export const formatError = ({ title }) => {
  return [`${C`red`}${title}`]
}

export const formatWarning = ({ title }) => {
  return [`${C`yellow`}${title}`]
}

export const formatStorageProp = ({ key, value, tabId }) => {
  const hasTabId = Boolean(tabId)

  const quotedTabId = hasTabId && getQuotedString(tabId)
  const quotedKey = getQuotedString(key)
  const quotedValue = getQuotedString(value)

  return [
    ...spreadIf(hasTabId, [`${C`blue`}${quotedTabId}`]),
    `${C`purple`}${quotedKey}`,
    `${C`yellow`}${quotedValue}`
  ]
}

export const formatResponse = ({ response, responseBody, method }) => {
  const shouldStringify = typeof responseBody !== 'string' && responseBody !== null
  const quotedURL = getQuotedString(response.url)
  const status = response.status

  const responseBodyString = shouldStringify ? JSON.stringify(responseBody) : responseBody
  const quotedResponseBody = getQuotedString(responseBodyString)
  const quotedMethod = getQuotedString(method)

  return [
    `${C`cyan`}${status}`,
    `${C`green`}${quotedMethod}`,
    `${C`brightYellow`}${quotedURL}`,
    `${C`yellow`}${quotedResponseBody}`
  ]
}

export const formatStorageAsString = ({ storage, tabId }) => {
  const stringStorage = JSON.stringify(storage)
  const hasTabId = Boolean(tabId)

  const quotedTabId = hasTabId && getQuotedString(tabId)
  const quotedStorage = getQuotedString(stringStorage)

  return [...spreadIf(hasTabId, [`${C`blue`}${quotedTabId}`]), `${C`yellow`}${quotedStorage}`]
}

export const formatAlias = ({ key, value }) => {
  const quotedKey = getQuotedString(key)
  const quotedValue = getQuotedString(value)

  return [`${C`purple`}${quotedKey}`, `${C`yellow`}${quotedValue}`]
}

export const formatAddon = ({ name, version }) => {
  const quotedName = getQuotedString(name)
  const quotedDateTime = getQuotedString(version)

  return [`${C`green`}${quotedName}`, `${C`cyan`}${quotedDateTime}`]
}

export const formatRegisteredEvent = ({ url, line, id }) => {
  const quotedId = getQuotedString(id)
  const quotedURL = getQuotedString(url)
  const quotedLine = getQuotedString(line)

  return [`${C`purple`}${quotedId}`, `${C`yellow`}${quotedURL}`, `${C`yellow`}${quotedLine}`]
}

export const formatEvent = ({ event, xpath }) => {
  const quotedEvent = getQuotedString(event)
  const quotedXPath = getQuotedString(xpath)

  return [`${C`purple`}${quotedEvent}`, `${C`yellow`}${quotedXPath}`]
}

export const formatTab = ({ windowId, id, title, url }, staticUrl) => {
  const quotedWindowId = getQuotedString(`W${windowId}`)
  const quotedId = getQuotedString(`T${id}`)
  const quotedTitle = getQuotedString(title)
  const quotedURL = getQuotedString(url || staticUrl)

  return [
    `${C`purple`}${quotedWindowId}`,
    `${C`blue`}${quotedId}`,
    `${C`brightYellow`}${quotedTitle}`,
    `${C`yellow`}${quotedURL}`
  ]
}

export const formatHistoryItem = ({ url, title, lastVisitTime }) => {
  const dateTime = new Date(lastVisitTime).toISOString()

  const quotedDateTime = getQuotedString(dateTime)
  const quotedTitle = getQuotedString(title)
  const quotedURL = getQuotedString(url)

  return [
    `${C`green`}${quotedDateTime}`,
    `${C`brightYellow`}${quotedTitle}`,
    `${C`yellow`}${quotedURL}`
  ]
}

export const formatTheme = ({ name }) => {
  const quotedName = getQuotedString(name)

  return [`${C`purple`}${quotedName}`]
}

export const formatStyle = ({ prop, value }) => {
  const quotedProp = getQuotedString(prop)
  const quotedValue = getQuotedString(value)

  return [`${C`cyan`}${quotedProp}`, `${C`yellow`}${quotedValue}`]
}

export const formatStringSearch = ({ query, input }) => {
  return input.replace(query, value => `${BG`red`}${C`brightWhite`}${value}${C`reset`}${BG`reset`}`)
}
