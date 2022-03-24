import React from 'react'

import { optionTypes } from '../../constants/commands.constants'

import { CommandHistory } from './CommandHistory.component'

export const historyConfig = {
  props: {
    goto: {
      key: 'goto',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      aliases: ['g']
    },
    protocol: {
      key: 'protocol',
      type: optionTypes.STRING,
      defaultValue: 'https',
      aliases: ['p']
    }
  },
  output: (props) => <CommandHistory key={props.id} {...props} />
}
