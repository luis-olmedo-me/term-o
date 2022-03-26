import React from 'react'
import { optionTypes } from '../../constants/commands.constants'
import { CommandDom } from './CommandDom.component'

export const domConfig = {
  props: {
    get: { key: 'get', type: 'array', defaultValue: ['*'], aliases: ['g'] },
    'has-id': {
      key: 'hasId',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      aliases: ['hi']
    },
    'has-class': {
      key: 'hasClass',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      aliases: ['hc']
    },
    'by-id': {
      key: 'byId',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: false,
      aliases: ['bi']
    }
  },
  output: (props) => <CommandDom key={props.id} {...props} />
}
