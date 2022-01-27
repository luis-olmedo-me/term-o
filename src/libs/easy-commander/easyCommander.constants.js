import React from 'react'

import { Dom } from './components/Dom/Dom.component'

export const consoleCommands = {
  dom: {
    props: {
      get: { type: 'array', defaultValue: [] }
    },
    output: (props) => <Dom key={props.id} {...props} />
  }
}
