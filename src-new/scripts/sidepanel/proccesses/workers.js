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

export const getElementStyles = (tabId, data) => {
  return createWorkerProcessRequest({
    type: 'get-element-styles',
    defaultResponse: [],
    tabId,
    data
  })
}
