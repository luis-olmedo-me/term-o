import { optionTypes } from '../../constants/commands.constants'
import { CommandOn } from './CommandOn.component'

export const onConfig = {
  props: [
    {
      key: 'url',
      description: 'URL to listen to',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: ['.'],
      alias: 'u'
    },
    {
      key: 'run',
      description: 'Command to run when the event is defined',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'r'
    },
    {
      key: 'event',
      description: 'Specify an event to run the command',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'e'
    }
  ],
  output: CommandOn
}

export const onActionTypes = {
  ADD_EVENT: 'ADD_EVENT',
  NONE: 'NONE'
}
