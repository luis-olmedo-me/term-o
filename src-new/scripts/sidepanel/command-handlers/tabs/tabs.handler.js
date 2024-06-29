import { getColor as C } from '@src/theme/theme.helpers'

export const handleTABS = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const tabs = await chrome.tabs.query({})

    tabs.forEach(tab => {
      command.update(
        `${C`blue`}W${tab.windowId} T${tab.id} ${C`yellow`}"${tab.title}" "${tab.url}"`
      )
    })
  }
}
