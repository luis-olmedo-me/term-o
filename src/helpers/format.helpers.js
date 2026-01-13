import { getColor as C } from '@src/helpers/themes.helpers'
import { getQuotedString } from '@src/helpers/utils.helpers'

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

export const formatText = ({ text }) => {
  const quotedText = getQuotedString(text)

  return `${C`yellow`}${quotedText}`
}

export const formatNotification = ({ title, message }) => {
  const quotedTitle = getQuotedString(title)
  const quotedMessage = getQuotedString(message)

  return `${C`brightYellow`}${quotedTitle} ${C`yellow`}${quotedMessage}`
}

export const formatError = ({ title }) => {
  return `${C`red`}${title}`
}

export const formatWarning = ({ title }) => {
  return `${C`yellow`}${title}`
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

export const formatAddon = ({ name, version }) => {
  const quotedName = getQuotedString(name)
  const quotedDateTime = getQuotedString(version)

  return `${C`green`}${quotedName} ${C`cyan`}${quotedDateTime}`
}

export const formatRegisteredEvent = ({ url, line, id }) => {
  const quotedId = getQuotedString(id)
  const quotedURL = getQuotedString(url)
  const quotedLine = getQuotedString(line)

  return `${C`purple`}${quotedId} ${C`yellow`}${quotedURL} ${quotedLine}`
}

export const formatEvent = ({ event, xpath }) => {
  const quotedEvent = getQuotedString(event)
  const quotedXPath = getQuotedString(xpath)

  return `${C`purple`}${quotedEvent} ${C`yellow`}${quotedXPath}`
}

export const formatTab = ({ windowId, id, title, url }, staticUrl) => {
  const quotedWindowId = getQuotedString(`W${windowId}`)
  const quotedId = getQuotedString(`T${id}`)
  const quotedTitle = getQuotedString(title)
  const quotedURL = getQuotedString(url || staticUrl)

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

export const formatStyle = ({ prop, value }) => {
  const quotedProp = getQuotedString(prop)
  const quotedValue = getQuotedString(value)

  return `${C`cyan`}${quotedProp} ${C`yellow`}${quotedValue}`
}
