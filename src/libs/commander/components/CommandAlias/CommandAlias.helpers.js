import { actionTypes } from '../../constants/commands.constants'
import { commander } from 'libs/commander'
import { aliasHeaders } from './CommandAlias.constants'

export const getActionType = ({
  list,
  delete: idsToDelete,
  add: newAliases
}) => {
  if (list) return actionTypes.SHOW_LIST
  else if (idsToDelete.length) return actionTypes.DELETE_ALIAS
  else if (newAliases.length) return actionTypes.ADD_ALIAS
  else return actionTypes.NONE
}

export const validateAliasesToAdd = ({ aliasesToAdd }) => {
  const newAliasesAsObject = aliasesToAdd.reduce((totalAliases, alias) => {
    return { ...totalAliases, ...alias }
  }, {})

  return Object.entries(newAliasesAsObject).reduce(
    (totalAliases, [name, command]) => {
      return commander.commandNames.includes(name)
        ? totalAliases
        : [...totalAliases, { name, command }]
    },
    []
  )
}

export const turnAliasesToTableItems = ({ aliases }) => {
  return aliases.map((alias) => {
    return aliasHeaders.map((aliasHeader) => {
      const rowValue = alias[aliasHeader]

      return {
        value: rowValue,
        actions: [
          {
            id: 'copy-value',
            title: 'Copy value',
            onClick: () => navigator.clipboard.writeText(rowValue),
            Component: '📋'
          }
        ]
      }
    })
  })
}
