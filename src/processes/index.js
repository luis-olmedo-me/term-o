import { processNames } from '@src/constants/process.constants'
import { createWorkerProcessRequest } from './process-creator'

export const findDOMElement = (tabId, data) => {
  return createWorkerProcessRequest({
    type: processNames.FIND_DOM_ELEMENT,
    defaultResponse: null,
    tabId,
    data
  })
}

export const getDOMElements = (tabId, data) => {
  return createWorkerProcessRequest({
    type: processNames.GET_DOM_ELEMENTS,
    defaultResponse: [],
    tabId,
    data
  })
}

export const getStorage = (tabId, data) => {
  return createWorkerProcessRequest({
    type: processNames.GET_STORAGE,
    defaultResponse: {},
    tabId,
    data
  })
}

export const setStorage = (tabId, data) => {
  return createWorkerProcessRequest({
    type: processNames.SET_STORAGE,
    defaultResponse: {},
    tabId,
    data
  })
}

export const getElementStyles = (tabId, data) => {
  return createWorkerProcessRequest({
    type: processNames.GET_ELEMENT_STYLES,
    defaultResponse: [],
    tabId,
    data
  })
}

export const getElementStylesTest = tabId => {
  return createWorkerProcessRequest({
    type: processNames.GET_ELEMENT_STYLES_TEST,
    defaultResponse: [],
    tabId
  })
}

export const applyElementStyles = (tabId, data) => {
  return createWorkerProcessRequest({
    type: processNames.APPLY_ELEMENT_STYLES,
    defaultResponse: [],
    tabId,
    data
  })
}

export const clickElement = (tabId, data) => {
  return createWorkerProcessRequest({
    type: processNames.CLICK_ELEMENT,
    defaultResponse: null,
    tabId,
    data
  })
}

export const getFontsAvailable = () => {
  return createWorkerProcessRequest({
    type: processNames.GET_FONTS_AVAILABLE,
    defaultResponse: [],
    data: null
  })
}
