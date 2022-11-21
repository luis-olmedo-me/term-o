import { optionTypes } from '../../constants/commands.constants'

import { CommandAlias } from './CommandAlias.component'

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
      type: optionTypes.OBJECT,
      objectTypes: ['string'],
      defaultValue: {},
      alias: 'a'
    }
  },
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
      width: '15%',
      minTableWidth: 630
    },
    {
      id: aliasHeaderIds.NAME,
      displayName: 'Name',
      width: '20%',
      minTableWidth: 0
    },
    {
      id: aliasHeaderIds.COMMAND,
      displayName: 'Command',
      width: '60%',
      minTableWidth: 0
    }
  ]
}

export const aliasActionTypes = {
  SHOW_LIST: 'SHOW_LIST',
  DELETE_ALIAS: 'DELETE_ALIAS',
  ADD_ALIAS: 'ADD_ALIAS'
}
