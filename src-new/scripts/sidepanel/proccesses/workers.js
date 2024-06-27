import { createWorkerProcessRequest } from './worker-creator'

export const getDOMElements = (tabId, data) => {
  return createWorkerProcessRequest({
    type: 'get-dom-elements',
    defaultResponse: {},
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
