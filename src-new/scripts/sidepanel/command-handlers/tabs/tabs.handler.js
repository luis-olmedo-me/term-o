import { getColor as C } from '@src/theme/theme.helpers'

export const handleTABS = async command => {
  const P = name => command.props[name]

  if (P`switch`) {
    const tabIdString = P`switch`.replace(/^T/, '')
    const tabId = Number(tabIdString)
    const tab = await chrome.tabs.get(tabId)

    await chrome.tabs.update(tabId, { selected: true })
    command.update(`You are on ${C`blue`}T${tab.id}${C`foreground`} now.`)
    command.update(`${C`blue`}W${tab.windowId} T${tab.id} ${C`yellow`}"${tab.title}" "${tab.url}"`)
  }

  if (P`list`) {
    const tabs = await chrome.tabs.query({})

    tabs.forEach(tab => {
      command.update(
        `${C`blue`}W${tab.windowId} T${tab.id} ${C`yellow`}"${tab.title}" "${tab.url}"`
      )
    })
  }
}
