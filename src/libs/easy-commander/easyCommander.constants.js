import React from 'react'

import { CommandOn } from './components/CommandOn/CommandOn.component'
import { Dom } from './components/Dom/Dom.component'
import { Styler } from './components/Styler/Styler.component'
import { cssProps } from './components/Styler/Styler.constants'

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
      'manual-styles': {
        key: 'manualStyles',
        internal: true,
        type: 'object',
        groupProps: cssProps,
        defaultValue: {},
        aliases: []
      },
      styles: {
        key: 'styles',
        type: 'string',
        defaultValue: '',
        aliases: ['s']
      }
    },
    output: (props) => <Styler key={props.id} {...props} />
  },
  on: {
    props: {
      url: {
        key: 'url',
        type: 'array',
        defaultValue: [],
        aliases: ['u']
      },
      run: {
        key: 'run',
        type: 'array',
        defaultValue: [],
        aliases: ['r']
      }
    },
    output: (props) => <CommandOn key={props.id} {...props} />
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
