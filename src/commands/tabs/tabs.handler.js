import { createTab, getTab, reloadTab } from '@src/browser-api/tabs.api'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatTab } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'
import { spreadIf } from '@src/helpers/utils.helpers'

export const tabsHandler = async command => {
  const { tab, setTab } = command.data
  const P = name => command.props[name]

  if (P`reload`) {
    if (P`wait`) command.update(`Please wait while the page is loading.`)
    const tab = await reloadTab({ tabId: cleanTabId(P`reload`), wait: P`wait` })
    const update = formatTab(tab)

    command.reset()
    command.update(update)
  }

  if (P`point`) {
    const tab = await getTab({ tabId: cleanTabId(P`point`) })
    const update = formatTab(tab)

    setTab(tab)

    command.update(update)
  }

  if (P`switch`) {
    const tab = await getTab({ tabId: cleanTabId(P`switch`) })
    const { focused } = await chrome.windows.get(tab.windowId)

    if (!focused) await chrome.windows.update(tab.windowId, { focused: true })
    await chrome.tabs.update(tab.id, { selected: true })

    const update = formatTab(tab)

    command.update(update)
  }

  if (P`close`) {
    const tab = await getTab({ tabId: cleanTabId(P`close`) })
    const update = formatTab(tab)

    await chrome.tabs.remove(tab.id)

    command.update(update)
  }

  if (P`open`) {
    if (P`wait`) command.update(`Please wait while the page is loading.`)
    const tab = await createTab({
      url: P`open`,
      active: P`active`,
      wait: P`wait`
    })

    const update = formatTab({
      ...tab,
      ...spreadIf(!P`wait`, { url: P`open` })
    })

    command.reset()
    command.update(update)
  }

  if (P`current`) {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })

    const update = formatTab(tab)

    command.update(update)
  }

  if (P`pointing`) {
    const update = formatTab(tab)

    command.update(update)
  }

  if (P`list`) {
    const onlyIncognito = P`incognito`
    const onlyTitle = P`title` && new RegExp(P`title`)
    const onlyURL = P`url` && new RegExp(P`url`)
    const onlyWindowId = P`window-id` && new RegExp(P`window-id`)

    const tabs = await chrome.tabs.query({
      ...spreadIf(P`muted`, { muted: true }),
      ...spreadIf(P`unmuted`, { muted: false })
    })

    for (const tab of tabs) {
      const { windowId, title, url, incognito } = tab

      if (onlyIncognito && !incognito) continue
      if (onlyTitle && !onlyTitle.test(title)) continue
      if (onlyURL && !onlyURL.test(url)) continue
      if (onlyWindowId && !onlyWindowId.test(`W${windowId}`)) continue

      const update = formatTab(tab)

      command.update(update)
    }
  }

  if (P`help`) createHelpView(command)
}
