import * as React from 'react'
import { CommandEvent } from './CommandEvent.component'
import { optionTypes } from '../../constants/commands.constants'

const eventKeys = {
  ID: 'id',
  URL: 'url',
  COMMAND: 'command',
  EVENT: 'event'
}

export const eventRows = [
  eventKeys.ID,
  eventKeys.URL,
  eventKeys.EVENT,
  eventKeys.COMMAND
]

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
