import React from 'react'

import { optionTypes } from 'libs/easy-commander/constants/commands.constants'

import { CommandCss } from './CommandCss.component'

import { kebabize, validStyleKeys } from '../../easyCommander.promises'

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
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: '',
      aliases: ['s']
    }
  },
  output: (props) => <CommandCss key={props.id} {...props} />
}
