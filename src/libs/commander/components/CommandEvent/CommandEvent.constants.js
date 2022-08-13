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
    }
  },
  output: (props) => <CommandEvent key={props.id} {...props} />
}

export const eventActionTypes = {
  SHOW_LIST: 'SHOW_LIST',
  DELETE_EVENT: 'DELETE_EVENT'
}
