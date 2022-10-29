import * as React from 'react'
import { optionTypes } from '../../constants/commands.constants'

import { CommandTime } from './CommandTime.component'

export const timeConfig = {
  props: {},
  output: (props) => <CommandTime key={props.id} {...props} />
}

export const timeActionTypes = {
  NONE: 'NONE'
}
