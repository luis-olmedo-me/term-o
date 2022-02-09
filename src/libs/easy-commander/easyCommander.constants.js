import React from 'react'

import { Dom } from './components/Dom/Dom.component'
import { Styler } from './components/Styler/Styler.component'

export const consoleCommands = {
  dom: {
    props: {
      get: { type: 'array', defaultValue: [] }
    },
    output: (props) => <Dom key={props.id} {...props} />
  },
  css: {
    props: {
      styles: { type: 'string', defaultValue: '' }
    },
    output: (props) => <Styler key={props.id} {...props} />
  }
}

export const parameterTypes = {
  ELEMENTS: 'elements',
  ELEMENT: 'element',
  STYLES: 'styles',
  COMMAND: 'command',
  BUTTON_GROUP: 'button-group'
}
