import React from 'react'
import { CommandEvent } from './CommandEvent.component'

export const eventKeys = {
  ID: 'id',
  URL: 'url',
  COMMAND: 'command'
}

export const eventRows = [eventKeys.ID, eventKeys.URL, eventKeys.COMMAND]

export const eventConfig = {
  props: {
    list: {
      key: 'list',
      type: 'boolean',
      defaultValue: false,
      aliases: ['l']
    },
    delete: {
      key: 'delete',
      type: 'array',
      defaultValue: [],
      aliases: ['d']
    }
  },
  output: (props) => <CommandEvent key={props.id} {...props} />
}
