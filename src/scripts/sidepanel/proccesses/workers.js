import { createTabWorkerProcessRequest, createWorkerProcessRequest } from './worker-creator'

export const findDOMElement = (tabId, data) => {
  return createTabWorkerProcessRequest({
    type: 'find-dom-element',
    defaultResponse: null,
    tabId,
    data
  })
}

export const getDOMElements = (tabId, data) => {
  return createTabWorkerProcessRequest({
    type: 'get-dom-elements',
    defaultResponse: [],
    tabId,
    data
  })
}

export const getStorage = (tabId, data) => {
  return createTabWorkerProcessRequest({
    type: 'get-storage',
    defaultResponse: {},
    tabId,
    data
  })
}

export const setStorage = (tabId, data) => {
  return createTabWorkerProcessRequest({
    type: 'set-storage',
    defaultResponse: {},
    tabId,
    data
  })
}

export const getElementStyles = (tabId, data) => {
  return createTabWorkerProcessRequest({
    type: 'get-element-styles',
    defaultResponse: [],
    tabId,
    data
  })
}

export const applyElementStyles = (tabId, data) => {
  return createTabWorkerProcessRequest({
    type: 'apply-element-styles',
    defaultResponse: [],
    tabId,
    data
  })
}

export const clickElement = (tabId, data) => {
  return createTabWorkerProcessRequest({
    type: 'click-element',
    defaultResponse: null,
    tabId,
    data
  })
}

export const executeCode = data => {
  return createWorkerProcessRequest({
    type: 'execute-code',
    defaultResponse: {},
    data
  })
}
