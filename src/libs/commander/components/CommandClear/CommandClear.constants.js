import { optionTypes } from '../../constants/commands.constants'

import { CommandClear } from './CommandClear.component'

export const clearConfig = {
  props: [
    {
      key: 'config',
      description: 'Reset any configuration made to TERM-O console',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'c'
    }
  ],
  output: CommandClear
}

export const clearActionTypes = {
  CLEAR_TERMINAL: 'CLEAR_TERMINAL',
  CLEAR_CONFIG: 'CLEAR_CONFIG'
}
