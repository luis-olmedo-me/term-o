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
      ...spreadIf(hasTabId, [`${C`blue`}${quotedTabId}${C`reset`}`]),
      ...spreadIf(hasXpath, [`${C`yellow`}${quotedXpath}${C`reset`}`]),
      ...spreadIf(hasTextContent, [`${C`yellow`}${quotedTextContent}${C`reset`}`])
    ]
  }

  const attrs = Object.entries(attributes).map(([name, value]) => {
    const hasValue = Boolean(value)
    const quotedAttrName = getQuotedString(name)
    const quotedAttrValue = hasValue && getQuotedString(value)

    return [
      `${C`green`}${quotedAttrName}${C`reset`}`,
      ...spreadIf(hasValue, [`${C`yellow`}${quotedAttrValue}${C`reset`}`])
    ]
  })

  const quotedTagName = getQuotedString(tagName)

  return [
    ...spreadIf(hasTabId, [`${C`blue`}${quotedTabId}${C`reset`}`]),
    `${C`red`}${quotedTagName}${C`reset`}`,
    ...attrs
  ]
}

export const formatText = ({ text }) => {
  const quotedText = getQuotedString(text)

  return [`${C`yellow`}${quotedText}${C`reset`}`]
}

export const formatNotification = ({ title, message }) => {
  const quotedTitle = getQuotedString(title)
  const quotedMessage = getQuotedString(message)

  return [`${C`brightYellow`}${quotedTitle}${C`reset`}`, `${C`yellow`}${quotedMessage}${C`reset`}`]
}

export const formatError = ({ title }) => {
  return [`${C`red`}${title}${C`reset`}`]
}

export const formatWarning = ({ title }) => {
  return [`${C`yellow`}${title}${C`reset`}`]
}

export const formatStorageProp = ({ key, value, tabId }) => {
  const hasTabId = Boolean(tabId)

  const quotedTabId = hasTabId && getQuotedString(tabId)
  const quotedKey = getQuotedString(key)
  const quotedValue = getQuotedString(value)

  return [
    ...spreadIf(hasTabId, [`${C`blue`}${quotedTabId}${C`reset`}`]),
    `${C`purple`}${quotedKey}${C`reset`}`,
    `${C`yellow`}${quotedValue}${C`reset`}`
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
    `${C`cyan`}${status}${C`reset`}`,
    `${C`green`}${quotedMethod}${C`reset`}`,
    `${C`brightYellow`}${quotedURL}${C`reset`}`,
    `${C`yellow`}${quotedResponseBody}${C`reset`}`
  ]
}

export const formatStorageAsString = ({ storage, tabId }) => {
  const stringStorage = JSON.stringify(storage)
  const hasTabId = Boolean(tabId)

  const quotedTabId = hasTabId && getQuotedString(tabId)
  const quotedStorage = getQuotedString(stringStorage)

  return [
    ...spreadIf(hasTabId, [`${C`blue`}${quotedTabId}${C`reset`}`]),
    `${C`yellow`}${quotedStorage}${C`reset`}`
  ]
}

export const formatAlias = ({ key, value }) => {
  const quotedKey = getQuotedString(key)
  const quotedValue = getQuotedString(value)

  return [`${C`purple`}${quotedKey}${C`reset`}`, `${C`yellow`}${quotedValue}${C`reset`}`]
}

export const formatAddon = ({ name, version }) => {
  const quotedName = getQuotedString(name)
  const quotedDateTime = getQuotedString(version)

  return [`${C`green`}${quotedName}${C`reset`}`, `${C`cyan`}${quotedDateTime}${C`reset`}`]
}

export const formatRegisteredEvent = ({ url, line, id }) => {
  const quotedId = getQuotedString(id)
  const quotedURL = getQuotedString(url)
  const quotedLine = getQuotedString(line)

  return [
    `${C`purple`}${quotedId}${C`reset`}`,
    `${C`yellow`}${quotedURL}${C`reset`}`,
    `${C`yellow`}${quotedLine}${C`reset`}`
  ]
}

export const formatEvent = ({ event, xpath }) => {
  const quotedEvent = getQuotedString(event)
  const quotedXPath = getQuotedString(xpath)

  return [`${C`purple`}${quotedEvent}${C`reset`}`, `${C`yellow`}${quotedXPath}${C`reset`}`]
}

export const formatTab = ({ windowId, id, title, url }, staticUrl) => {
  const quotedWindowId = getQuotedString(`W${windowId}`)
  const quotedId = getQuotedString(`T${id}`)
  const quotedTitle = getQuotedString(title)
  const quotedURL = getQuotedString(url || staticUrl)

  return [
    `${C`purple`}${quotedWindowId}${C`reset`}`,
    `${C`blue`}${quotedId}${C`reset`}`,
    `${C`brightYellow`}${quotedTitle}${C`reset`}`,
    `${C`yellow`}${quotedURL}${C`reset`}`
  ]
}

export const formatHistoryItem = ({ url, title, lastVisitTime }) => {
  const dateTime = new Date(lastVisitTime).toISOString()

  const quotedDateTime = getQuotedString(dateTime)
  const quotedTitle = getQuotedString(title)
  const quotedURL = getQuotedString(url)

  return [
    `${C`green`}${quotedDateTime}${C`reset`}`,
    `${C`brightYellow`}${quotedTitle}${C`reset`}`,
    `${C`yellow`}${quotedURL}${C`reset`}`
  ]
}

export const formatTheme = ({ name }) => {
  const quotedName = getQuotedString(name)

  return [`${C`purple`}${quotedName}${C`reset`}`]
}

export const formatStyle = ({ prop, value }) => {
  const quotedProp = getQuotedString(prop)
  const quotedValue = getQuotedString(value)

  return [`${C`cyan`}${quotedProp}${C`reset`}`, `${C`yellow`}${quotedValue}${C`reset`}`]
}

export const formatStringSearch = ({ query, input }) => {
  return input.replace(query, value => `${BG`red`}${C`brightWhite`}${value}${C`reset`}${BG`reset`}`)
}
