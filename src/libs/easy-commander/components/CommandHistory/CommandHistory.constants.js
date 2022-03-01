import React from 'react'

import { CommandHistory } from './CommandHistory.component'

export const historyConfig = {
  props: {},
  output: (props) => <CommandHistory key={props.id} {...props} />
}
