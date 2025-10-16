export const commandNames = {
  CLEAR: 'clear',
  ERROR: 'error',
  DOM: 'dom',
  STORAGE: 'storage',
  TABS: 'tabs',
  ALIAS: 'alias',
  THEME: 'theme',
  STYLE: 'style',
  EVENTS: 'events',
  HISTORY: 'history',
  REQUEST: 'request',
  SCRIPTS: 'scripts'
}

export const executionContexts = {
  BACKGROUND: 'background',
  SIDEPANEL: 'sidepanel'
}

export const commandStatuses = {
  IDLE: 'idle',
  EXECUTING: 'executing',
  DONE: 'done',
  ERROR: 'error'
}

export const commandTypes = {
  STRING: 'string',
  STRING_ARRAY: 'string-array',
  NUMBER: 'number',
  BOOLEAN: 'boolean'
}
