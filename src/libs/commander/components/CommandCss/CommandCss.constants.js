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
      internal: true,
      type: optionTypes.OBJECT,
      groupProps: cssProps,
      defaultValue: {},
      aliases: []
    },
    styles: {
      key: 'styles',
      type: optionTypes.STRING,
      defaultValue: '',
      aliases: ['s']
    }
  },
  output: (props) => <CommandCss key={props.id} {...props} />
}
