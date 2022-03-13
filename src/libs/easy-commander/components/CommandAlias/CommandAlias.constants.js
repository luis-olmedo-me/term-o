import React from 'react'

import { optionTypes } from 'libs/easy-commander/constants/commands.constants'

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
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      aliases: ['l']
    },
    delete: {
      key: 'delete',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      aliases: ['d']
    },
    add: {
      key: 'add',
      type: optionTypes.ARRAY_OF_OBJECTS,
      defaultValue: [],
      aliases: ['a']
    }
  },
  output: (props) => <CommandAlias key={props.id} {...props} />
}
