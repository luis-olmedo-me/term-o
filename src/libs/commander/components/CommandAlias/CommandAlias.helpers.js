import * as React from 'preact'

import { generateUUID } from '@src/helpers/utils.helpers'
import { Copy } from '@src/modules/icons'
import { actionTypes } from '../../constants/commands.constants'
import { aliasTableOptions } from './CommandAlias.constants'

export const getActionType = ({ list, delete: idsToDelete, add: newAliases }) => {
  if (list) return actionTypes.SHOW_LIST
  else if (idsToDelete.length) return actionTypes.DELETE_ALIAS
  else if (Object.keys(newAliases).length) return actionTypes.ADD_ALIAS
  else return actionTypes.NONE
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
