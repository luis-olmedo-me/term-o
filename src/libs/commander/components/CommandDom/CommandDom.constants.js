import * as React from 'preact'

import { Home, Palette, Tag } from '@src/modules/icons'
import { optionTypes } from '../../constants/commands.constants'
import { CommandDom } from './CommandDom.component'

export const domConfig = {
  props: [
    {
      key: 'get',
      description: 'Get the value of a DOM element',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'g'
    },
    {
      key: 'byText',
      description: 'Get a DOM element by text',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'bt'
    },
    {
      key: 'byStyle',
      description: 'Get a DOM element by style',
      type: optionTypes.OBJECT,
      objectTypes: ['string'],
      defaultValue: {},
      alias: 'bs'
    },
    {
      key: 'byAttr',
      description: 'Get a DOM element by attribute',
      type: optionTypes.OBJECT,
      objectTypes: ['string', 'boolean'],
      defaultValue: {},
      alias: 'ba'
    },
    {
      key: 'hidden',
      description: 'Check if a DOM element is hidden for user',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'h'
    },
    {
      key: 'byXpath',
      description: 'Get a DOM element by xpath',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'bx'
    },
    {
      key: 'byParentLevel',
      description: 'Search through parents many times from the elements found',
      type: optionTypes.NUMBER,
      defaultValue: 0,
      alias: 'bpl'
    },
    {
      key: 'getParent',
      description: 'Get parents of all elements found',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'gp'
    },
    {
      key: 'attr',
      description: 'Set attributes of elements from parameters',
      type: optionTypes.OBJECT,
      defaultValue: {},
      objectTypes: ['string', 'boolean'],
      alias: 'a'
    }
  ],
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
  SET_ATTRIBUTES: 'SET_ATTRIBUTES',
  NONE: 'NONE'
}
