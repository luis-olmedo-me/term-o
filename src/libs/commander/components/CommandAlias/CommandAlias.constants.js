import { defaultCellActionIds } from 'modules/components/Table'
import { optionTypes } from '../../constants/commands.constants'

import { CommandAlias } from './CommandAlias.component'

export const aliasConfig = {
  props: [
    {
      key: 'list',
      description: 'List all aliases',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'l'
    },
    {
      key: 'delete',
      description: 'Delete an alias',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'd'
    },
    {
      key: 'add',
      description: 'Add an alias',
      type: optionTypes.OBJECT,
      objectTypes: ['string'],
      defaultValue: {},
      alias: 'a'
    }
  ],
  output: CommandAlias
}

export const aliasHeaderIds = {
  ID: 'id',
  NAME: 'name',
  COMMAND: 'command'
}
export const aliasTableOptions = {
  columns: [
    {
      id: aliasHeaderIds.ID,
      displayName: 'ID',
      field: 'id',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    },
    {
      id: aliasHeaderIds.NAME,
      displayName: 'Name',
      field: 'name',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    },
    {
      id: aliasHeaderIds.COMMAND,
      displayName: 'Command',
      field: 'command',
      actionIds: [defaultCellActionIds.COPY_VALUE]
    }
  ]
}

export const aliasActionTypes = {
  SHOW_LIST: 'SHOW_LIST',
  DELETE_ALIAS: 'DELETE_ALIAS',
  ADD_ALIAS: 'ADD_ALIAS',
  NONE: 'NONE'
}

export const MAX_ITEMS = 10
