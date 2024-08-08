import { delay } from '@src/helpers/utils.helpers'

export const getTab = async tabIdRaw => {
  const tabIdString = tabIdRaw.replace(/^T/, '')
  const tabId = Number(tabIdString)
  const isValidId = !Number.isNaN(tabId) && tabIdRaw.startsWith('T')

  if (!isValidId) throw 'The tab id provided is not valid.'

  return await chrome.tabs.get(tabId)
}

export const createTab = async options => {
  let tab = await chrome.tabs.create(options.config)

  if (options.wait) {
    while (tab.status !== 'complete') {
      await delay(100)
      tab = await chrome.tabs.get(tab.id)
    }
  }

  return tab
}

export const reloadTab = async options => {
  let tab = await getTab(options.tabId)

  await chrome.tabs.reload(tab.id)

  if (options.wait) {
    tab = await chrome.tabs.get(tab.id)

    while (tab.status !== 'complete') {
      await delay(100)
      tab = await chrome.tabs.get(tab.id)
    }
  }

  return tab
}

export const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

  return tab
}
