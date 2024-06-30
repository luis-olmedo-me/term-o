import { getColor as C } from '@src/theme/theme.helpers'

export const handleTABS = async command => {
  const P = name => command.props[name]

  if (P`switch`) {
    const tabIdRaw = P`switch`
    const tabIdString = tabIdRaw.replace(/^T/, '')
    const tabId = Number(tabIdString)
    const isValidId = !Number.isNaN(tabId) && tabIdRaw.startsWith('T')

    if (!isValidId) throw 'The tab id provided is not valid.'

    const { windowId, id, title, url } = await chrome.tabs.get(tabId)
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
