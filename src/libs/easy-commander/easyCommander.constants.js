import React from 'react'

import { Dom } from './components/Dom/Dom.component'
import { Styler } from './components/Styler/Styler.component'

export const consoleCommands = {
  dom: {
    props: {
      get: { key: 'get', type: 'array', defaultValue: ['*'], aliases: ['g'] },
      'has-id': {
        key: 'hasId',
        type: 'boolean',
        defaultValue: false,
        aliases: ['i']
      },
      'has-class': {
        key: 'hasClass',
        type: 'boolean',
        defaultValue: false,
        aliases: ['c']
      }
    },
    output: (props) => <Dom key={props.id} {...props} />
  },
  css: {
    props: {
      styles: {
        key: 'styles',
        type: 'string',
        defaultValue: '',
        aliases: ['s']
      }
    },
    output: (props) => <Styler key={props.id} {...props} />
  }
}

export const parameterTypes = {
  ELEMENTS: 'elements',
  ELEMENT: 'element',
  STYLES: 'styles',
  COMMAND: 'command',
  BUTTON_GROUP: 'button-group',
  ERROR: 'error',
  INFO: 'info'
}
