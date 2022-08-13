import React from 'react'
import { optionTypes } from '../../constants/commands.constants'
import { CommandDom } from './CommandDom.component'

export const domConfig = {
  props: {
    get: {
      key: 'get',
      description: 'Get the value of a DOM element',
      type: 'array',
      defaultValue: ['*'],
      aliases: ['g']
    },
    'has-id': {
      key: 'hasId',
      description: 'Check if a DOM element has an id',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      aliases: ['hi']
    },
    'has-class': {
      key: 'hasClass',
      description: 'Check if a DOM element has a class',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      aliases: ['hc']
    },
    'by-id': {
      key: 'byId',
      description: 'Get a DOM element by id',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      aliases: ['bi']
    },
    'by-class': {
      key: 'byClass',
      description: 'Get a DOM element by class',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      aliases: ['bc']
    },
    'by-text': {
      key: 'byText',
      description: 'Get a DOM element by text',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      aliases: ['bt']
    },
    'by-style': {
      key: 'byStyle',
      description: 'Get a DOM element by style',
      type: optionTypes.ARRAY_OF_OBJECTS,
      defaultValue: [],
      aliases: ['bs']
    },
    'by-attribute': {
      key: 'byAttribute',
      description: 'Get a DOM element by attribute',
      type: optionTypes.ARRAY_OF_OBJECTS,
      defaultValue: [],
      aliases: ['ba']
    },
    hidden: {
      key: 'hidden',
      description: 'Check if a DOM element is hidden for user',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      aliases: ['h']
    },
    'by-xpath': {
      key: 'byXpath',
      description: 'Get a DOM element by xpath',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      aliases: ['bx']
    }
  },
  output: (props) => <CommandDom key={props.id} {...props} />
}
