import { options } from '@src/helpers/validation-command.helpers'
import { commandTypes } from './command.constants'

export const optionDefaultValues = {
  [commandTypes.ARRAY]: [],
  [commandTypes.STRING]: '',
  [commandTypes.BOOLEAN]: false,
  [commandTypes.NUMBER]: 0,
  none: null,
  repeated: []
}

export const domEvents = {
  CLICK: 'click'
}
export const tabEvents = {
  LOADED: 'tab-loaded',
  SELECTION_CONTENT: 'tab-selection-content'
}

export const avaialableDomEvents = Object.values(domEvents)
export const availableTabEvents = Object.values(tabEvents)

export const responseFormatSupported = ['blob', 'text', 'json']

export const helpOptionConfig = {
  name: 'help',
  abbreviation: 'h',
  type: commandTypes.BOOLEAN,
  helpSection: 'General',
  description: 'Show help for this command',
  validate: [options.requireNoOther],
  defaultValue: false
}
