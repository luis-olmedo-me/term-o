import { processNames } from '@src/constants/process.constants'
import { createWorkerProcessRequest } from './process-creator'

export const findDOMElement = (
  tabId,
  { searchByXpath, searchBelow, siblingIndex, parentIndex, childIndex, appendXpath }
) => {
  return createWorkerProcessRequest({
    type: processNames.FIND_DOM_ELEMENT,
    defaultResponse: null,
    tabId,
    data: { searchByXpath, searchBelow, siblingIndex, parentIndex, childIndex, appendXpath }
  })
}

export const getDOMElements = (
  tabId,
  { searchBelow, searchByTag, searchByAttribute, searchByStyle, searchByText, appendTextContent, appendXpath }
) => {
  return createWorkerProcessRequest({
    type: processNames.GET_DOM_ELEMENTS,
    defaultResponse: [],
    tabId,
    data: { searchBelow, searchByTag, searchByAttribute, searchByStyle, searchByText, appendTextContent, appendXpath }
  })
}

export const getStorage = (tabId, { includeLocal, includeSession, includeCookies }) => {
  return createWorkerProcessRequest({
    type: processNames.GET_STORAGE,
    defaultResponse: {},
    tabId,
    data: { includeLocal, includeSession, includeCookies }
  })
}

export const setStorage = (tabId, { namespace, key, value }) => {
  return createWorkerProcessRequest({
    type: processNames.SET_STORAGE,
    defaultResponse: {},
    tabId,
    data: { namespace, key, value }
  })
}

export const getElementStyles = (tabId, { searchByXpath, searchByProperty }) => {
  return createWorkerProcessRequest({
    type: processNames.GET_ELEMENT_STYLES,
    defaultResponse: [],
    tabId,
    data: { searchByXpath, searchByProperty }
  })
}

export const applyElementStyles = (tabId, { searchByXpath, newInlineStyles }) => {
  return createWorkerProcessRequest({
    type: processNames.APPLY_ELEMENT_STYLES,
    defaultResponse: [],
    tabId,
    data: { searchByXpath, newInlineStyles }
  })
}

export const clickElement = (tabId, { searchByXpath }) => {
  return createWorkerProcessRequest({
    type: processNames.CLICK_ELEMENT,
    defaultResponse: null,
    tabId,
    data: { searchByXpath }
  })
}

export const uploadFile = tabId => {
  return createWorkerProcessRequest({
    type: processNames.UPLOAD_FILE,
    defaultResponse: {},
    tabId,
    data: null
  })
}

export const pickColor = tabId => {
  return createWorkerProcessRequest({
    type: processNames.PICK_COLOR,
    defaultResponse: null,
    tabId,
    data: null
  })
}

export const executeCode = ({ script }) => {
  return createWorkerProcessRequest({
    type: processNames.EXECUTE_CODE,
    defaultResponse: {},
    data: { script }
  })
}

export const executeCommand = ({ line, origin }) => {
  return createWorkerProcessRequest({
    type: processNames.EXECUTE_COMMAND,
    defaultResponse: null,
    data: { line, origin }
  })
}

export const getFontsAvailable = () => {
  return createWorkerProcessRequest({
    type: processNames.GET_FONTS_AVAILABLE,
    defaultResponse: [],
    data: null
  })
}
