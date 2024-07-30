import { displayHelp, formatTab, renameError } from '../handlers.helpers'
import { createTab, getTab } from './tabs.helpers'

export const handleTABS = async command => {
  const { tab, setTab } = command.data
  const P = name => command.props[name]

  if (P`reload`) {
    const tab = await getTab(P`reload`).catch(renameError)
    const update = formatTab(tab)
    await chrome.tabs.reload(tab.id).catch(renameError)

    command.update(update)
  }

  if (P`point`) {
    const tab = await getTab(P`point`).catch(renameError)
    const update = formatTab(tab)

    setTab(tab)

    command.update(update)
  }

  if (P`switch`) {
    const tab = await getTab(P`switch`).catch(renameError)
    const { focused } = await chrome.windows.get(tab.windowId).catch(renameError)

    if (!focused) await chrome.windows.update(tab.windowId, { focused: true })
    await chrome.tabs.update(tab.id, { selected: true })

    const update = formatTab(tab)

    command.update(update)
  }

  if (P`close`) {
    const tab = await getTab(P`close`).catch(renameError)
    const update = formatTab(tab)

    await chrome.tabs.remove(tab.id)

    command.update(update)
  }

  if (P`open`) {
    command.update(`Please wait while the page is loading.`)
    const tab = await createTab({ url: P`open` }).catch(renameError)
    const update = formatTab(tab)

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

  if (P`help`) displayHelp(command)
}
