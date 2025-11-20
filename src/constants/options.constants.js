import { commandTypes } from './command.constants'

export const optionDefaultValues = {
  [commandTypes.STRING_ARRAY]: [],
  [commandTypes.STRING]: '',
  [commandTypes.BOOLEAN]: false,
  [commandTypes.NUMBER]: 0,
  [commandTypes.NONE]: null
}

const eventsAvailable = {
  CLICK: 'click'
}

export const responseFormatSupported = ['blob', 'text', 'json']

export const eventsSupported = [eventsAvailable.CLICK]
export const domEventsSupported = [eventsAvailable.CLICK]
