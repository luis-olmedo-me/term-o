import * as React from 'react'

import { optionTypes } from '../../constants/commands.constants'

import { CommandAlias } from './CommandAlias.component'

const aliasKeys = {
  ID: 'id',
  NAME: 'name',
  COMMAND: 'command'
}

export const aliasHeaders = [aliasKeys.ID, aliasKeys.NAME, aliasKeys.COMMAND]

export const aliasConfig = {
  props: {
    list: {
      key: 'list',
      description: 'List all aliases',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'l'
    },
    delete: {
      key: 'delete',
      description: 'Delete an alias',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'd'
    },
    add: {
      key: 'add',
      description: 'Add an alias',
      type: optionTypes.ARRAY_OF_OBJECTS,
      defaultValue: [],
      alias: 'a'
    }
  },
  output: (props) => <CommandAlias key={props.id} {...props} />
}
