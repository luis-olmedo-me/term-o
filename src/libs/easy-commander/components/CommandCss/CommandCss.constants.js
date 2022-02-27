import React from 'react'

import { CommandCss } from './CommandCss.component'

import { kebabize, validStyleKeys } from '../../easyCommander.promises'

const cssProps = validStyleKeys.reduce((props, key) => {
  return {
    ...props,
    [kebabize(key)]: { key, type: 'string', defaultValue: '', aliases: [] }
  }
}, {})

export const cssConfig = {
  props: {
    'manual-styles': {
      key: 'manualStyles',
      internal: true,
      type: 'object',
      groupProps: cssProps,
      defaultValue: {},
      aliases: []
    },
    styles: {
      key: 'styles',
      type: 'string',
      defaultValue: '',
      aliases: ['s']
    }
  },
  output: (props) => <CommandCss key={props.id} {...props} />
}
