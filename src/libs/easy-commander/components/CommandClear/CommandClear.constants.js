import React from 'react'

import { CommandClear } from './CommandClear.component'

export const clearConfig = {
  props: {},
  output: (props) => <CommandClear key={props.id} {...props} />
}
