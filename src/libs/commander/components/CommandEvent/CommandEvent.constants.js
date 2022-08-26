import React from 'react'
import { CommandEvent } from './CommandEvent.component'
import { optionTypes } from '../../constants/commands.constants'

const eventKeys = {
  ID: 'id',
  URL: 'url',
  COMMAND: 'command'
}

export const eventRows = [eventKeys.ID, eventKeys.URL, eventKeys.COMMAND]

export const eventConfig = {
  props: {
    list: {
      key: 'list',
      description: 'List all events',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      aliases: ['l']
    },
    delete: {
      key: 'delete',
      description: 'Delete an event',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      aliases: ['d']
    },
    trigger: {
      key: 'trigger',
      description: 'Trigger an event',
      type: optionTypes.STRING,
      defaultValue: '',
      aliases: ['t']
    },
    value: {
      key: 'value',
      description:
        'Insert this value when "valuechange" event is triggered on inputs elements.',
      type: optionTypes.STRING,
      defaultValue: '',
      aliases: ['v']
    }
  },
  output: (props) => <CommandEvent key={props.id} {...props} />
}

export const supportedEvents = {
  CLICK: 'click',
  CHANGE: 'change'
}
export const supportedEventNames = Object.values(supportedEvents)

export const eventActionTypes = {
  SHOW_LIST: 'SHOW_LIST',
  DELETE_EVENT: 'DELETE_EVENT',
  TRIGGER: 'TRIGGER'
}
