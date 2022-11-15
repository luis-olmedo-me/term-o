import { optionTypes } from '../../constants/commands.constants'
import { CommandHelp } from './CommandHelp.component'

export const helpConfig = {
  props: {
    about: {
      key: 'about',
      description: 'Show help for a specific command',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'a'
    }
  },
  output: CommandHelp
}

export const helpActionTypes = {
  HELP: 'HELP',
  NONE: 'NONE'
}
