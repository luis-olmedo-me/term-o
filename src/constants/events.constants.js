export const eventTypes = {
  ADD_PAGES_EVENT: 'term-o-add-pages-event',
  DELETE_PAGES_EVENT: 'term-o-delete-pages-event',
  UPDATE_CONFIG_CONSOLE_POSITION: 'term-o-update-config-console-position',
  GET_CONFIGURATION: 'term-o-get-configuration',
  ADD_ALIAS: 'term-o-add-alias',
  DELETE_ALIAS: 'term-o-delete-alias',
  RESET_CONFIGURATION: 'term-o-reset-configuration',
  GET_TABS_OPEN: 'term-o-get-tabs-info',
  TERM_O_RESIZE: 'term-o-resize',
  GET_HISTORIAL: 'term-o-get-historial'
}

export const extensionKeyEvents = {
  TOGGLE_TERMINAL: 'toggle-terminal',
  RESIZE_RIGHT: 'resize-right',
  RESIZE_LEFT: 'resize-left',
  RESIZE_FULL: 'resize-full'
}
export const extensionKeyEventNames = Object.values(extensionKeyEvents)
