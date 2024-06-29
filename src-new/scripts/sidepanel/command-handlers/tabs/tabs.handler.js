import { getStorage } from '@sidepanel/proccesses/workers'
import { getColor as C } from '@src/theme/theme.helpers'

export const handleTABS = async command => {
  // const { tab } = command.data
  const P = name => command.props[name]

  if (P`list`) {
    const tabs = await chrome.tabs.query({})

    tabs.forEach(tab => {
      command.update(`W${tab.windowId} T${tab.id} "${tab.title}" "${tab.url}"`)
    })
  }
}
