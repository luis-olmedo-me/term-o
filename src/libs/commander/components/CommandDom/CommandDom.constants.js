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
      defaultValue: [],
      aliases: ['bi']
    },
    'by-class': {
      key: 'byClass',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      aliases: ['bc']
    },
    'by-text': {
      key: 'byText',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      aliases: ['bt']
    },
    'by-style': {
      key: 'byStyle',
      type: optionTypes.ARRAY_OF_OBJECTS,
      defaultValue: [],
      aliases: ['bs']
    },
    'by-attribute': {
      key: 'byAttribute',
      type: optionTypes.ARRAY_OF_OBJECTS,
      defaultValue: [],
      aliases: ['ba']
    }
  },
  output: (props) => <CommandDom key={props.id} {...props} />
}
