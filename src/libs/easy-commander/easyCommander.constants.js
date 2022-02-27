import React from 'react'

import { CommandOn } from './components/CommandOn/CommandOn.component'
import { CommandEvent } from './components/CommandEvent/CommandEvent.component'

import { cssConfig } from './components/CommandCss/CommandCss.constants'
import { domConfig } from './components/CommandDom/CommandDom.constants'

export const consoleCommands = {
  dom: domConfig,
  css: cssConfig,
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
  },
  event: {
    props: {
      list: {
        key: 'list',
        type: 'boolean',
        defaultValue: false,
        aliases: ['l']
      },
      delete: {
        key: 'delete',
        type: 'array',
        defaultValue: [],
        aliases: ['d']
      }
    },
    output: (props) => <CommandEvent key={props.id} {...props} />
  }
}

export const parameterTypes = {
  ELEMENTS: 'elements',
  ELEMENT: 'element',
  STYLES: 'styles',
  COMMAND: 'command',
  BUTTON_GROUP: 'button-group',
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  TABLE: 'table'
}
