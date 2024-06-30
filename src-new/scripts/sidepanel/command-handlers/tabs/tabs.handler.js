import { getColor as C } from '@src/theme/theme.helpers'

export const handleTABS = async command => {
  const P = name => command.props[name]

  if (P`switch`) {
    const tabIdString = P`switch`.replace(/^T/, '')
    const tabId = Number(tabIdString)
    const { windowId, id, title, url } = await chrome.tabs.get(tabId)

    await chrome.tabs.update(tabId, { selected: true })
    command.update(`You are on ${C`blue`}T${id}${C`foreground`} now.`)
    command.update(`${C`blue`}W${windowId} ${C`bright-blue`}T${id} ${C`yellow`}"${title}" "${url}"`)
  }

  if (P`list`) {
    const tabs = await chrome.tabs.query({})

    tabs.forEach(({ windowId, id, title, url }) => {
      command.update(
        `${C`blue`}W${windowId} ${C`bright-blue`}T${id} ${C`yellow`}"${title}" "${url}"`
      )
    })
  }
}
