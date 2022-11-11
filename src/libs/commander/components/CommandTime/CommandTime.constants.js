import * as React from 'preact'
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
    }
  },
  output: (props) => <CommandTime key={props.id} {...props} />
}

export const timeActionTypes = {
  SET_DELAY: 'SET_DELAY',
  NONE: 'NONE'
}
