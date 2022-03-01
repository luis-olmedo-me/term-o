import React from 'react'

import { CommandHistory } from './CommandHistory.component'

export const historyConfig = {
  props: {
    goto: {
      key: 'goto',
      type: 'array',
      defaultValue: [],
      aliases: ['g']
    },
    protocol: {
      key: 'protocol',
      type: 'string',
      defaultValue: 'https',
      aliases: ['p']
    }
  },
  output: (props) => <CommandHistory key={props.id} {...props} />
}
