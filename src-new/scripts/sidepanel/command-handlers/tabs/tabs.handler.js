import { getTab } from '@sidepanel/proccesses/workers'
import { getColor as C } from '@src/theme/theme.helpers'
import { renameError } from '../command-handlers.helpers'

export const handleTABS = async command => {
  const { setTab } = command.data
  const P = name => command.props[name]

  if (P`reload`) {
    const { windowId, id, title, url } = await getTab(P`reload`).catch(renameError)
    await chrome.tabs.reload(tabId).catch(renameError)

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
    await chrome.tabs.update(tabId, { selected: true })

    command.update(`You are on ${C`blue`}T${id}${C`foreground`} now.`)
    command.update(`${C`purple`}W${windowId} ${C`blue`}T${id} ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`list`) {
    const tabs = await chrome.tabs.query({})

    tabs.forEach(({ windowId, id, title, url }) => {
      command.update(`${C`purple`}W${windowId} ${C`blue`}T${id} ${C`yellow`}"${title}" "${url}"`)
    })
  }
}
