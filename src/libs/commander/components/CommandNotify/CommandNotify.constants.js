import * as React from 'react'
import { optionTypes } from '../../constants/commands.constants'

import { CommandNotify } from './CommandNotify.component'

export const notifyConfig = {
  props: {
    message: {
      key: 'message',
      description: 'Trigger a notification with a message',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'm'
    },
    image: {
      key: 'image',
      description: 'Set image URL as icon in notification',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'i'
    }
  },
  output: (props) => <CommandNotify key={props.id} {...props} />
}

export const notifyActionTypes = {
  NOTIFY: 'NOTIFY',
  NONE: 'NONE'
}
