import { createTab, getTab } from '@sidepanel/proccesses/workers'
import { getColor as C } from '@src/theme/theme.helpers'
import { renameError } from '../command-handlers.helpers'

export const handleTABS = async command => {
  const { setTab } = command.data
  const P = name => command.props[name]

  if (P`reload`) {
    const { windowId, id, title, url } = await getTab(P`reload`).catch(renameError)
    await chrome.tabs.reload(id).catch(renameError)

    command.update(`The tab ${C`blue`}T${id}${C`foreground`} has been refreshed now.`)
    command.update(`${C`purple`}W${windowId} ${C`blue`}T${id} ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`points`) {
    const tab = await getTab(P`points`).catch(renameError)
    const { windowId, id, title, url } = tab

    setTab(tab)

    command.update(`You are focused terminal on ${C`blue`}T${id}${C`foreground`} now.`)
    command.update(`${C`purple`}W${windowId} ${C`blue`}T${id} ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`switch`) {
    const { windowId, id, title, url } = await getTab(P`switch`).catch(renameError)
    const { focused } = await chrome.windows.get(windowId).catch(renameError)

    if (!focused) await chrome.windows.update(windowId, { focused: true })
    await chrome.tabs.update(id, { selected: true })

    command.update(`You are on ${C`blue`}T${id}${C`foreground`} now.`)
    command.update(`${C`purple`}W${windowId} ${C`blue`}T${id} ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`close`) {
    const { windowId, id, title, url } = await getTab(P`close`).catch(renameError)

    await chrome.tabs.remove(id)

    command.update(`The tab ${C`blue`}T${id}${C`foreground`} is closed now.`)
    command.update(`${C`purple`}W${windowId} ${C`blue`}T${id} ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`open`) {
    command.update(`Please wait while the page is loading.`)
    const { windowId, id, title, url } = await createTab({ url: P`open` }).catch(renameError)

    command.reset()
    command.update(`New tab ${C`blue`}T${id}${C`foreground`} is created.`)
    command.update(`${C`purple`}W${windowId} ${C`blue`}T${id} ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`list`) {
    const onlyIncognito = P`incognito`
    const tabs = await chrome.tabs.query({})

    for (const tab of tabs) {
      const { windowId, id, title, url, incognito } = tab

      if (onlyIncognito && !incognito) continue

      command.update(`${C`purple`}W${windowId} ${C`blue`}T${id} ${C`yellow`}"${title}" "${url}"`)
    }
  }
}
