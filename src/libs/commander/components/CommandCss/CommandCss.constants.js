import React from 'react'

import { optionTypes } from '../../constants/commands.constants'

import { CommandCss } from './CommandCss.component'

import { kebabize, validStyleKeys } from '../../commander.promises'

const cssProps = validStyleKeys.reduce((props, key) => {
  return {
    ...props,
    [kebabize(key)]: { key, type: 'array', defaultValue: '', aliases: [] }
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
      aliases: []
    },
    styles: {
      key: 'styles',
      description: 'Apply inline CSS',
      type: optionTypes.STRING,
      defaultValue: '',
      aliases: ['s']
    }
  },
  output: (props) => <CommandCss key={props.id} {...props} />
}
