import * as React from 'react'
import { CommandEvent } from './CommandEvent.component'
import { optionTypes } from '../../constants/commands.constants'

export const eventConfig = {
  props: {
    list: {
      key: 'list',
      description: 'List all events',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'l'
    },
    delete: {
      key: 'delete',
      description: 'Delete an event',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'd'
    },
    trigger: {
      key: 'trigger',
      description: 'Trigger an event',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 't'
    },
    value: {
      key: 'value',
      description:
        'Insert this value when "change" event is triggered on inputs elements',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'v'
    }
  },
  output: (props) => <CommandEvent key={props.id} {...props} />
}

export const supportedEvents = {
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
  SHOW_LIST: 'SHOW_LIST',
  DELETE_EVENT: 'DELETE_EVENT',
  TRIGGER: 'TRIGGER'
}

const eventHeaderIds = {
  ID: 'id',
  URL: 'url',
  EVENT: 'event',
  COMMAND: 'command'
}

export const eventTableOptions = {
  columns: [
    {
      id: eventHeaderIds.ID,
      displayName: 'ID',
      width: 20,
      minTableWidth: 555
    },
    {
      id: eventHeaderIds.URL,
      displayName: 'URL',
      width: 15,
      minTableWidth: 0
    },
    {
      id: eventHeaderIds.EVENT,
      displayName: 'Event',
      width: 15,
      minTableWidth: 700
    },
    {
      id: eventHeaderIds.COMMAND,
      displayName: 'Command',
      width: 50,
      minTableWidth: 0
    }
  ]
}
