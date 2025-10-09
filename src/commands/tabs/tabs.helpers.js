import { overwriteError } from '@src/helpers/messages.helpers'
import { delay } from '@src/helpers/utils.helpers'

export const getTab = async tabIdRaw => {
  const tabIdString = tabIdRaw.replace(/^T/, '')
  const tabId = Number(tabIdString)
  const isValidId = !Number.isNaN(tabId) && tabIdRaw.startsWith('T')

  if (!isValidId) throw 'The tab id provided is not valid.'

  return await chrome.tabs.get(tabId).catch(overwriteError)
}

export const createTab = async options => {
  let tab = await chrome.tabs.create(options.config).catch(overwriteError)

  if (options.wait) {
    while (tab.status !== 'complete') {
      await delay(100)
      tab = await chrome.tabs.get(tab.id).catch(overwriteError)
    }
  }

  return tab
}

export const reloadTab = async options => {
  let tab = await getTab(options.tabId).catch(overwriteError)

  await chrome.tabs.reload(tab.id).catch(overwriteError)

  if (options.wait) {
    tab = await chrome.tabs.get(tab.id).catch(overwriteError)

    while (tab.status !== 'complete') {
      await delay(100)
      tab = await chrome.tabs.get(tab.id).catch(overwriteError)
    }
  }

  return tab
}

export const getCurrentTab = async () => {
  const [tab] = await chrome.tabs
    .query({ active: true, lastFocusedWindow: true })
    .catch(overwriteError)

  return tab
}
