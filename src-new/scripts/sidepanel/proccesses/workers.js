import { delay } from '@src/helpers/utils.helpers'
import { createWorkerProcessRequest } from './worker-creator'

export const findDOMElement = (tabId, data) => {
  return createWorkerProcessRequest({
    type: 'find-dom-element',
    defaultResponse: null,
    tabId,
    data
  })
}

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

export const createTab = async options => {
  let tab = await chrome.tabs.create(options)

  while (tab.status !== 'complete') {
    await delay(100)
    tab = await chrome.tabs.get(tab.id)
  }

  return tab
}
