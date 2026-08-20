import processManager from '@src/libs/process-manager'

import { getTab } from '@src/browser-api/tabs.api'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatText, formatUrlParams } from '@src/helpers/format.helpers'
import { unquotify } from '@src/helpers/string.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'

export const urlHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  let tabId = storage.get(storageKeys.TAB).id

  if (P`tab-id`) {
    command.log(['"Connecting to the tab."'])
    const validTab = await getTab({ tabId: cleanTabId(P`tab-id`) })

    tabId = validTab.id
  }

  if (P`get` && P`host`) {
    const text = await processManager.readPath(tabId, { path: 'window.location.href' })
    const currentUrl = unquotify(text)
    const url = new URL(currentUrl)
    const log = formatText({ text: url.host })

    command.clearLogs()
    command.log(log)
  }

  if (P`get` && P`href`) {
    const text = await processManager.readPath(tabId, { path: 'window.location.href' })
    const currentUrl = unquotify(text)
    const url = new URL(currentUrl)
    const log = formatText({ text: url.href })

    command.clearLogs()
    command.log(log)
  }

  if (P`get` && P`pathname`) {
    const text = await processManager.readPath(tabId, { path: 'window.location.href' })
    const currentUrl = unquotify(text)
    const url = new URL(currentUrl)
    const log = formatText({ text: url.pathname })

    command.clearLogs()
    command.log(log)
  }

  if (P`get` && P`search`) {
    const text = await processManager.readPath(tabId, { path: 'window.location.href' })
    const currentUrl = unquotify(text)
    const url = new URL(currentUrl)

    const log = P`as-params`
      ? formatUrlParams({ params: new URLSearchParams(url.search) })
      : formatText({ text: url.search })

    command.clearLogs()
    command.log(log)
  }

  if (P`get` && P`hash`) {
    const text = await processManager.readPath(tabId, { path: 'window.location.href' })
    const currentUrl = unquotify(text)
    const url = new URL(currentUrl)
    const hash = url.hash.slice(1)

    const log = P`as-params`
      ? formatUrlParams({ params: new URLSearchParams(hash) })
      : formatText({ text: hash })

    command.clearLogs()
    command.log(log)
  }

  if (P`set` && P`host`) {
    const text = await processManager.readPath(tabId, { path: 'window.location.href' })
    const currentUrl = unquotify(text)
    const url = new URL(currentUrl)

    url.host = P`value`

    await processManager.changeUrl(tabId, { url: url.href })
    const log = formatText({ text: url.href })

    command.clearLogs()
    command.log(log)
  }

  if (P`set` && P`href`) {
    const text = await processManager.readPath(tabId, { path: 'window.location.href' })
    const currentUrl = unquotify(text)
    const url = new URL(currentUrl)

    url.href = P`value`

    await processManager.changeUrl(tabId, { url: url.href })
    const log = formatText({ text: url.href })

    command.clearLogs()
    command.log(log)
  }

  if (P`set` && P`pathname`) {
    const text = await processManager.readPath(tabId, { path: 'window.location.href' })
    const currentUrl = unquotify(text)
    const url = new URL(currentUrl)

    url.pathname = P`value`

    await processManager.changeUrl(tabId, { url: url.href })
    const log = formatText({ text: url.href })

    command.clearLogs()
    command.log(log)
  }

  if (P`set` && P`search`) {
    const newParams = P`param`
    const text = await processManager.readPath(tabId, { path: 'window.location.href' })
    const currentUrl = unquotify(text)
    const url = new URL(currentUrl)

    if (P`as-params`) newParams.forEach(([key, value]) => url.searchParams.set(key, value))
    else url.search = P`value`

    await processManager.changeUrl(tabId, { url: url.href })

    const log = P`as-params`
      ? formatUrlParams({ params: new URLSearchParams(url.search) })
      : formatText({ text: url.search })

    command.clearLogs()
    command.log(log)
  }

  if (P`set` && P`hash`) {
    const newParams = P`param`
    const text = await processManager.readPath(tabId, { path: 'window.location.href' })
    const currentUrl = unquotify(text)
    const url = new URL(currentUrl)
    const hash = url.hash.slice(1)
    const hashParams = new URLSearchParams(hash)

    if (P`as-params`) {
      newParams.forEach(([key, value]) => hashParams.set(key, value))

      url.hash = `#${hashParams.toString()}`
    } else url.hash = P`value`

    await processManager.changeUrl(tabId, { url: url.href })

    const log = P`as-params`
      ? formatUrlParams({ params: new URLSearchParams(url.search) })
      : formatText({ text: url.search })

    command.clearLogs()
    command.log(log)
  }

  if (P`help`) createHelpView(command)
}
