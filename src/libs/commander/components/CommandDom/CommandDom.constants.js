import * as React from 'preact'

import { Home, Palette, Tag } from '@src/modules/icons'
import { optionTypes } from '../../constants/commands.constants'
import { CommandDom } from './CommandDom.component'

export const domConfig = {
  props: {
    get: {
      key: 'get',
      description: 'Get the value of a DOM element',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'g'
    },
    'has-id': {
      key: 'hasId',
      description: 'Check if a DOM element has an id',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'hi'
    },
    'has-class': {
      key: 'hasClass',
      description: 'Check if a DOM element has a class',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'hc'
    },
    'by-id': {
      key: 'byId',
      description: 'Get a DOM element by id',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'bi'
    },
    'by-class': {
      key: 'byClass',
      description: 'Get a DOM element by class',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'bc'
    },
    'by-text': {
      key: 'byText',
      description: 'Get a DOM element by text',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'bt'
    },
    'by-style': {
      key: 'byStyle',
      description: 'Get a DOM element by style',
      type: optionTypes.OBJECT,
      objectTypes: ['string'],
      defaultValue: {},
      alias: 'bs'
    },
    'by-attr': {
      key: 'byAttr',
      description: 'Get a DOM element by attribute',
      type: optionTypes.OBJECT,
      objectTypes: ['string', 'boolean'],
      defaultValue: {},
      alias: 'ba'
    },
    hidden: {
      key: 'hidden',
      description: 'Check if a DOM element is hidden for user',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'h'
    },
    'by-xpath': {
      key: 'byXpath',
      description: 'Get a DOM element by xpath',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'bx'
    },
    'by-parent-level': {
      key: 'byParentLevel',
      description: 'Search through parents many times from the elements found',
      type: optionTypes.NUMBER,
      defaultValue: 0,
      alias: 'bpl'
    },
    'get-parent': {
      key: 'getParent',
      description: 'Get parents of all elements found',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'gp'
    },
    attr: {
      key: 'attr',
      description: 'Set attributes of elements from parameters',
      type: optionTypes.OBJECT,
      defaultValue: {},
      objectTypes: ['string'],
      alias: 'a'
    }
  },
  output: CommandDom
}

export const domViewIds = {
  MAIN: 0,
  ATTRIBUTES: 1,
  STYLES: 2
}

export const domViews = [
  { id: domViewIds.MAIN, text: <Home /> },
  { id: domViewIds.ATTRIBUTES, text: <Tag /> },
  { id: domViewIds.STYLES, text: <Palette /> }
]

export const domActionTypes = {
  GET_DOM_ELEMENTS: 'GET_DOM_ELEMENTS',
  NONE: 'NONE'
}
