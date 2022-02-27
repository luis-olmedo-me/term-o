import React from 'react'
import { CommandDom } from './CommandDom.component'

export const domConfig = {
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
  output: (props) => <CommandDom key={props.id} {...props} />
}
