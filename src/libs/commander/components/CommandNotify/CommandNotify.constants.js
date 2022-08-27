import React from 'react'
import { optionTypes } from '../../constants/commands.constants'

import { CommandNotify } from './CommandNotify.component'

export const notifyConfig = {
  props: {},
  output: (props) => <CommandNotify key={props.id} {...props} />
}

export const notifyActionTypes = {
  NOTIFY: 'NOTIFY'
}
