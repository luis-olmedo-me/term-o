import * as React from 'preact'

import { generateUUID } from '@src/helpers/utils.helpers'
import { Copy } from '@src/modules/icons'
import { aliasActionTypes, aliasTableOptions } from './CommandAlias.constants'

export const getActionType = ({ list, delete: idsToDelete, add: newAliases }) => {
  if (list) return aliasActionTypes.SHOW_LIST
  else if (idsToDelete.length) return aliasActionTypes.DELETE_ALIAS
  else if (Object.keys(newAliases).length) return aliasActionTypes.ADD_ALIAS
  else return aliasActionTypes.NONE
}

export const validateAliasesToAdd = ({ aliasesToAdd }) => {
  return Object.entries(aliasesToAdd).map(([name, command]) => {
    return { id: generateUUID(), name, command }
  }, [])
}

export const turnAliasesToTableItems = ({ aliases }) => {
  return aliases.map(alias => {
    return aliasTableOptions.columns.map(({ id }) => {
      const rowValue = alias[id]

      return {
        value: rowValue,
        actions: [
          {
            id: 'copy-value',
            title: 'Copy value',
            onClick: () => navigator.clipboard.writeText(rowValue),
            Component: <Copy />
          }
        ]
      }
    })
  })
}
