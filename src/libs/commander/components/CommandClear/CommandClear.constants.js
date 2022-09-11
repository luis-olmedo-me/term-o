import React from 'react'
import { optionTypes } from '../../constants/commands.constants'

import { CommandClear } from './CommandClear.component'

export const clearConfig = {
  props: {
    config: {
      key: 'config',
      description: 'Reset any configuration made to TERM-O console',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      aliases: 'c'
    }
  },
  output: (props) => <CommandClear key={props.id} {...props} />
}
