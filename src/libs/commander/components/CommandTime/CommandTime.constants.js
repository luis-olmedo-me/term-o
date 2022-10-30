import * as React from 'react'
import { optionTypes } from '../../constants/commands.constants'

import { CommandTime } from './CommandTime.component'

export const timeConfig = {
  props: {
    delay: {
      key: 'delay',
      description: 'Set a delay time before running the next command.',
      type: optionTypes.NUMBER,
      defaultValue: 0,
      alias: 'd'
    },
    interval: {
      key: 'interval',
      description: 'Set a interval time before running the next command.',
      type: optionTypes.NUMBER,
      defaultValue: 0,
      alias: 'i'
    }
  },
  output: (props) => <CommandTime key={props.id} {...props} />
}

export const timeActionTypes = {
  SET_DELAY: 'SET_DELAY',
  SET_INTERVAL: 'SET_INTERVAL',
  NONE: 'NONE'
}
