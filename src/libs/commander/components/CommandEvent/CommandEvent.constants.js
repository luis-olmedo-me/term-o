import { internalEventProperties, optionTypes } from '../../constants/commands.constants'
import { CommandEvent } from './CommandEvent.component'

export const eventConfig = {
  props: [
    {
      key: 'list',
      description: 'List all events',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'l'
    },
    {
      key: 'delete',
      description: 'Delete an event',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'd'
    },
    {
      key: 'trigger',
      description: 'Trigger an event',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 't'
    },
    {
      key: 'value',
      description: 'Insert this value when "change" event is triggered on inputs elements',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'v'
    },
    {
      key: 'listeners',
      description: 'List all event listeners',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'L'
    }
  ],
  output: CommandEvent
}

export const triggerableEvents = {
  CLICK: 'click',
  CHANGE: 'change'
}

export const inputsChangeTrigerables = ['INPUT', 'SELECT']
export const inputTypeChangeTrigerables = [
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'search',
  'tel',
  'text',
  'time',
  'url',
  'week'
]

export const eventActionTypes = {
  SHOW_LISTENERS_LIST: 'SHOW_LISTENERS_LIST',
  SHOW_LIST: 'SHOW_LIST',
  DELETE_EVENT: 'DELETE_EVENT',
  TRIGGER: 'TRIGGER'
}

export const MAX_ITEMS = 10

export const internalEventTableOptions = {
  columns: [
    {
      id: internalEventProperties.ID,
      displayName: 'ID',
      width: '20%',
      minTableWidth: 555
    },
    {
      id: internalEventProperties.URL,
      displayName: 'URL',
      width: '15%',
      minTableWidth: 0
    },
    {
      id: internalEventProperties.EVENT,
      displayName: 'Event',
      width: '15%',
      minTableWidth: 700
    },
    {
      id: internalEventProperties.COMMAND,
      displayName: 'Command',
      width: '50%',
      minTableWidth: 0
    }
  ]
}
