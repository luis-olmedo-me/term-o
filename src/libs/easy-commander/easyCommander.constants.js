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
      styles: { key: 'styles', type: 'string', defaultValue: '' },
      'has-id': { key: 'hasId', type: 'boolean', defaultValue: false },
      'has-class': { key: 'hasClass', type: 'boolean', defaultValue: false }
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
