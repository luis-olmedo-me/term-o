export const parameterTypes = {
  ELEMENTS: 'elements',
  ELEMENT: 'element',
  STYLES: 'styles',
  COMMAND: 'command',
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  TABLE: 'table',
  HELP: 'help',
  CODE: 'code'
}

export const optionTypes = {
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  ARRAY: 'array',
  ARRAY_OF_STRINGS: 'array-of-strings',
  GROUP: 'group',
  STRING: 'string',
  OBJECT: 'object'
}

export const actionTypes = {
  GET_DOM_ELEMENTS: 'GET_DOM_ELEMENTS',
  SHOW_LIST: 'SHOW_LIST',
  DELETE_ALIAS: 'DELETE_ALIAS',
  ADD_ALIAS: 'ADD_ALIAS',
  CLEAR_TERMINAL: 'CLEAR_TERMINAL',
  CLEAR_CONFIG: 'CLEAR_CONFIG',
  SET_STYLES: 'SET_STYLES',
  DELETE_EVENT: 'DELETE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  REDIRECT: 'REDIRECT',
  NONE: 'NONE',
  LOCAL_STORAGE: 'LOCAL_STORAGE'
}

export const customPageEvents = {
  CLICK: 'click'
}
export const customPageEventNames = Object.values(customPageEvents)

export const internalEventProperties = {
  ID: 'id',
  URL: 'url',
  EVENT: 'event',
  COMMAND: 'command'
}
