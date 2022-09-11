import React from 'react'

import { optionTypes } from '../../constants/commands.constants'

import { CommandCss } from './CommandCss.component'

import { kebabize, validStyleKeys } from '../../commander.promises'

const cssProps = validStyleKeys.reduce((props, key) => {
  return {
    ...props,
    [kebabize(key)]: {
      key,
      type: optionTypes.STRING,
      defaultValue: '',
      alias: ''
    }
  }
}, {})

export const cssConfig = {
  props: {
    'manual-styles': {
      key: 'manualStyles',
      description: 'Apply any CSS property you want to set',
      internal: true,
      type: optionTypes.OBJECT,
      groupProps: cssProps,
      defaultValue: {},
      alias: ''
    },
    styles: {
      key: 'styles',
      description: 'Apply inline CSS',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 's'
    },
    get: {
      key: 'get',
      description: 'Get styles from parameter elements',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'g'
    }
  },
  output: (props) => <CommandCss key={props.id} {...props} />
}

export const cssActionTypes = {
  SET_STYLES: 'SET_STYLES',
  GET_STYLES: 'GET_STYLES',
  NONE: 'NONE'
}
