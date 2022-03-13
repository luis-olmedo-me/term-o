import React from 'react'
import { CommandAlias } from './CommandAlias.component'

export const aliasKeys = {
  ALIAS: 'alias',
  VALUE: 'value'
}

export const aliasHeaders = [aliasKeys.ALIAS, aliasKeys.VALUE]

export const aliasConfig = {
  props: {
    list: {
      key: 'list',
      type: 'boolean',
      defaultValue: false,
      aliases: ['l']
    },
    delete: {
      key: 'delete',
      type: 'array-of-strings',
      defaultValue: [],
      aliases: ['d']
    },
    add: {
      key: 'add',
      type: 'array-of-objects',
      defaultValue: [],
      aliases: ['a']
    }
  },
  output: (props) => <CommandAlias key={props.id} {...props} />
}
