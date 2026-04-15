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

export const domEventsAvailable = {
  CLICK: 'click'
}

export const responseFormatSupported = ['blob', 'text', 'json']

export const domEventsSupported = Object.values(domEventsAvailable)

export const helpOptionConfig = {
  name: 'help',
  abbreviation: 'h',
  type: commandTypes.BOOLEAN,
  helpSection: 'General',
  description: 'Show help for this command',
  validate: [options.requireNoOther],
  defaultValue: false
}
