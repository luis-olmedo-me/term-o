import { overwriteError } from '@src/helpers/messages.helpers'
import { delay, spreadIf } from '@src/helpers/utils.helpers'

export const getTab = async ({ tabId }) => {
  const allTabs = await chrome.tabs.query({})
  const isValidTabId = allTabs.some(tab => tab.id === tabId)

  if (!isValidTabId) throw 'No tab id found.'

  return chrome.tabs.get(tabId).catch(overwriteError)
}

export const getTabsSearch = async ({
  muted,
  unmuted,
  active,
  lastFocusedWindow,
  byIncognito,
  byTitle,
  byUrl,
  byWindowId
}) => {
  const byTitleRegExp = byTitle && new RegExp(byTitle)
  const byUrlRegExp = byUrl && new RegExp(byUrl)
  const byWindowIdRegExp = byWindowId && new RegExp(byWindowId)

  const tabs = await chrome.tabs
    .query({
      ...spreadIf(muted, { muted: true }),
      ...spreadIf(active, { active: true }),
      ...spreadIf(unmuted, { muted: false }),
      ...spreadIf(lastFocusedWindow, { lastFocusedWindow: true })
    })
    .catch(overwriteError)

  return Array.from(tabs).filter(({ windowId, title, url, incognito }) => {
    if (byIncognito && !incognito) return false
    if (byTitleRegExp && !byTitleRegExp.test(title)) return false
    if (byUrlRegExp && !byUrlRegExp.test(url)) return false
    if (byWindowIdRegExp && !byWindowIdRegExp.test(`W${windowId}`)) return false

    return true
  })
}

export const getCurrentTab = async () => {
  const [tab] = await getTabsSearch({ active: true, lastFocusedWindow: true })

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
  let tab = await getTab({ tabId })

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

export const updateTab = ({ tabId, selected }) => {
  return chrome.tabs.update(tabId, {
    ...spreadIf(selected, { selected: true })
  })
}
