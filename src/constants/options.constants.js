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

export const listenedEventTypes = {
  DOCUMENT: 'document',
  WINDOW: 'window'
}

export const listenedEvents = [
  { label: 'doc-*', pattern: /^doc-\S+$/, type: listenedEventTypes.DOCUMENT },
  { label: 'win-*', pattern: /^win-\S+$/, type: listenedEventTypes.WINDOW }
]

export const avaialableDomEvents = Object.values(domEvents)

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
