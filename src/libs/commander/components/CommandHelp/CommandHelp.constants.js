import React from 'react'

import { CommandHelp } from './CommandHelp.component'

export const helpConfig = {
  props: {},
  output: (props) => <CommandHelp key={props.id} {...props} />
}

export const helpActionTypes = {
  HELP: 'HELP',
  NONE: 'NONE'
}
