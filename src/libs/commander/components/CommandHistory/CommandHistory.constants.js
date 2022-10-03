import * as React from 'react'

import { optionTypes } from '../../constants/commands.constants'

import { CommandHistory } from './CommandHistory.component'

export const historyConfig = {
  props: {
    goto: {
      key: 'goto',
      description: 'Go to a specific history entry (URL)',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'g'
    },
    protocol: {
      key: 'protocol',
      description: 'Define the protocol to use for the history entry',
      type: optionTypes.STRING,
      defaultValue: 'https',
      alias: 'p'
    },
    list: {
      key: 'list',
      description: 'List all history items',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'l'
    }
  },
  output: (props) => <CommandHistory key={props.id} {...props} />
}

export const historyActionTypes = {
  SHOW_LIST: 'SHOW_LIST',
  REDIRECT: 'REDIRECT',
  NONE: 'NONE'
}
