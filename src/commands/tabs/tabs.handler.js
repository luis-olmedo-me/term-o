import { spreadIf } from '@src/helpers/utils.helpers'

import { createHelpView } from '@src/helpers/command.helpers'
import { formatTab } from '@src/helpers/format.helpers'
import { createTab, getTab, reloadTab } from './tabs.helpers'

export const tabsHandler = async command => {
  const { tab, setTab } = command.data
  const P = name => command.props[name]

  if (P`reload`) {
    if (P`wait`) command.update(`Please wait while the page is loading.`)
    const tab = await reloadTab({ tabId: P`reload`, wait: P`wait` })
    const update = formatTab(tab)

    command.reset()
    command.update(update)
  }

  if (P`point`) {
    const tab = await getTab(P`point`)
    const update = formatTab(tab)

    setTab(tab)

    command.update(update)
  }

  if (P`switch`) {
    const tab = await getTab(P`switch`)
    const { focused } = await chrome.windows.get(tab.windowId)

    if (!focused) await chrome.windows.update(tab.windowId, { focused: true })
    await chrome.tabs.update(tab.id, { selected: true })

    const update = formatTab(tab)

    command.update(update)
  }

  if (P`close`) {
    const tab = await getTab(P`close`)
    const update = formatTab(tab)

    await chrome.tabs.remove(tab.id)

    command.update(update)
  }

  if (P`open`) {
    if (P`wait`) command.update(`Please wait while the page is loading.`)
    const tab = await createTab({
      config: { url: P`open`, active: P`active` },
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

    const onlyMuted = P`muted` ? { muted: true } : null
    const onlyUnmuted = P`unmuted` ? { muted: false } : null

    const tabs = await chrome.tabs.query({
      ...onlyMuted,
      ...onlyUnmuted
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
