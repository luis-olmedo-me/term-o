import { overwriteError } from '@src/helpers/messages.helpers'
import { delay } from '@src/helpers/utils.helpers'

export const getTab = async ({ tabId }) => {
  const allTabs = await chrome.tabs.query({})
  const isValidTabId = allTabs.some(tab => tab.id === tabId)

  if (!isValidTabId) throw 'No tab id found.'

  return chrome.tabs.get(tabId).catch(overwriteError)
}

export const getCurrentTab = async () => {
  const [tab] = await chrome.tabs
    .query({ active: true, lastFocusedWindow: true })
    .catch(overwriteError)

  return tab
}

export const createTab = async ({ url, active, wait }) => {
  let tab = await chrome.tabs.create({ url, active }).catch(overwriteError)

  if (wait) {
    while (tab.status !== 'complete') {
      await delay(100)
      tab = await getTab({ tabId: tab.id })
    }
  }

  return tab
}

export const reloadTab = async ({ tabId, wait }) => {
  let tab = await getTab({ tabId }).catch(overwriteError)

  await chrome.tabs.reload(tab.id).catch(overwriteError)

  if (wait) {
    tab = await getTab({ tabId: tab.id })

    while (tab.status !== 'complete') {
      await delay(100)
      tab = await getTab({ tabId: tab.id })
    }
  }

  return tab
}
