import { getColor as C } from '../../../../theme/theme.helpers'
import { displayHelp, renameError } from '../command-handlers.helpers'
import { createTab, getTab } from './tabs.helpers'

export const handleTABS = async command => {
  const { tab, setTab } = command.data
  const P = name => command.props[name]

  if (P`reload`) {
    const { windowId, id, title, url } = await getTab(P`reload`).catch(renameError)
    await chrome.tabs.reload(id).catch(renameError)

    command.update(`${C`purple`}"W${windowId}" ${C`blue`}"T${id}" ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`points`) {
    const tab = await getTab(P`points`).catch(renameError)
    const { windowId, id, title, url } = tab

    setTab(tab)

    command.update(`${C`purple`}"W${windowId}" ${C`blue`}"T${id}" ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`switch`) {
    const { windowId, id, title, url } = await getTab(P`switch`).catch(renameError)
    const { focused } = await chrome.windows.get(windowId).catch(renameError)

    if (!focused) await chrome.windows.update(windowId, { focused: true })
    await chrome.tabs.update(id, { selected: true })

    command.update(`${C`purple`}"W${windowId}" ${C`blue`}"T${id}" ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`close`) {
    const { windowId, id, title, url } = await getTab(P`close`).catch(renameError)

    await chrome.tabs.remove(id)

    command.update(`${C`purple`}"W${windowId}" ${C`blue`}"T${id}" ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`open`) {
    command.update(`Please wait while the page is loading.`)
    const { windowId, id, title, url } = await createTab({ url: P`open` }).catch(renameError)

    command.reset()
    command.update(`${C`purple`}"W${windowId}" ${C`blue`}"T${id}" ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`current`) {
    const [{ windowId, id, title, url }] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })

    command.update(`${C`purple`}"W${windowId}" ${C`blue`}"T${id}" ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`pointing`) {
    const { windowId, id, title, url } = tab

    command.update(`${C`purple`}"W${windowId}" ${C`blue`}"T${id}" ${C`yellow`}"${title}" "${url}"`)
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
      const { windowId, id, title, url, incognito } = tab

      if (onlyIncognito && !incognito) continue
      if (onlyTitle && !onlyTitle.test(title)) continue
      if (onlyURL && !onlyURL.test(url)) continue
      if (onlyWindowId && !onlyWindowId.test(`W${windowId}`)) continue

      command.update(
        `${C`purple`}"W${windowId}" ${C`blue`}"T${id}" ${C`yellow`}"${title}" "${url}"`
      )
    }
  }

  if (P`help`) displayHelp(command)
}
