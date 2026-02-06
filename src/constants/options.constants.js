import { commandTypes } from './command.constants'

export const optionDefaultValues = {
  [commandTypes.STRING_ARRAY]: [],
  [commandTypes.STRING]: '',
  [commandTypes.BOOLEAN]: false,
  [commandTypes.NUMBER]: 0,
  [commandTypes.NONE]: null
}

export const eventsAvailable = {
  CLICK: 'click'
}

export const responseFormatSupported = ['blob', 'text', 'json']

export const eventsSupported = [eventsAvailable.CLICK]
export const domEventsSupported = [eventsAvailable.CLICK]

export const helpOptionConfig = {
  name: 'help',
  abbreviation: 'h',
  type: commandTypes.BOOLEAN,
  helpSection: 'General',
  description: 'Show help for this command',
  worksWith: [],
  defaultValue: false
}
