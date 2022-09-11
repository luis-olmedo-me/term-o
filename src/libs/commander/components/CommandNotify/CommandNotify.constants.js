import React from 'react'
import { optionTypes } from '../../constants/commands.constants'

import { CommandNotify } from './CommandNotify.component'

export const notifyConfig = {
  props: {
    message: {
      key: 'message',
      description: 'Trigger a notification with a message',
      type: optionTypes.STRING,
      defaultValue: '',
      aliases: 'm'
    },
    image: {
      key: 'image',
      description: 'Set image URL as icon in notification',
      type: optionTypes.STRING,
      defaultValue: '',
      aliases: 'i'
    }
  },
  output: (props) => <CommandNotify key={props.id} {...props} />
}

export const notifyActionTypes = {
  NOTIFY: 'NOTIFY',
  NONE: 'NONE'
}
