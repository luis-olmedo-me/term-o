import { getTabsSearch } from '@src/browser-api/tabs.api'
import { overwriteError } from '@src/helpers/messages.helpers'
import { spreadIf } from '@src/helpers/utils.helpers'

export const getWindow = async ({ windowId }) => {
  const allTabs = await getTabsSearch({})
  const isValidwindowId = allTabs.some(tab => tab.windowId === windowId)

  if (!isValidwindowId) throw 'No window id found.'

  return chrome.windows.get(windowId).catch(overwriteError)
}

export const updateWindow = ({ windowId, focused }) => {
  return chrome.windows
    .update(windowId, {
      ...spreadIf(focused, { focused: true })
    })
    .catch(overwriteError)
}
