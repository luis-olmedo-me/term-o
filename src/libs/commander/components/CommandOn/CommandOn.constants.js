import React from 'react'
import { optionTypes } from '../../constants/commands.constants'
import { CommandOn } from './CommandOn.component'

export const onConfig = {
  props: {
    url: {
      key: 'url',
      description: 'URL to listen to',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: ['.'],
      aliases: ['u']
    },
    run: {
      key: 'run',
      description: 'Command to run when the event is defined',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      aliases: ['r']
    },
    event: {
      key: 'event',
      description: 'Specify an event to run the command',
      type: optionTypes.STRING,
      defaultValue: '',
      aliases: ['e']
    }
  },
  output: (props) => <CommandOn key={props.id} {...props} />
}

export const onActionTypes = {
  ADD_EVENT: 'ADD_EVENT',
  NONE: 'NONE'
}
