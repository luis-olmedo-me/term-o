import { optionTypes } from '../../constants/commands.constants'

import { CommandNotify } from './CommandNotify.component'

export const notifyConfig = {
  props: [
    {
      key: 'message',
      description: 'Trigger a notification with a message',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'm'
    },
    {
      key: 'image',
      description: 'Set image URL as icon in notification',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'i'
    }
  ],
  output: CommandNotify
}

export const notifyActionTypes = {
  NOTIFY: 'NOTIFY',
  NONE: 'NONE'
}
