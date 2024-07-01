import { createWorkerProcessRequest } from './worker-creator'

export const getDOMElements = (tabId, data) => {
  return createWorkerProcessRequest({
    type: 'get-dom-elements',
    defaultResponse: [],
    tabId,
    data
  })
}

export const getStorage = (tabId, data) => {
  return createWorkerProcessRequest({
    type: 'get-storage',
    defaultResponse: {},
    tabId,
    data
  })
}

export const getTab = async tabIdRaw => {
  const tabIdString = tabIdRaw.replace(/^T/, '')
  const tabId = Number(tabIdString)
  const isValidId = !Number.isNaN(tabId) && tabIdRaw.startsWith('T')

  if (!isValidId) throw 'The tab id provided is not valid.'

  return await chrome.tabs.get(tabId)
}
