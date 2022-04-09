import React, { useEffect, useState, useCallback } from 'react'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'
import { aliasHeaders } from './CommandAlias.constants'
import {
  fetchConfiguration,
  addAliases,
  deleteAliases
} from 'src/helpers/event.helpers.js'
import { getActionType, validateAliasesToAdd } from './CommandAlias.helpers'
import { aliasMessages } from './CommandAlias.messages'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'

export const CommandAlias = ({
  props,
  terminal: { setMessageData, command }
}) => {
  const { list, delete: deletedIds, add: aliasesToAdd } = props

  const [tableItems, setTableItems] = useState([])

  const { pageData, buttonGroups } = usePaginationGroups({
    items: tableItems,
    maxItems: 10
  })

  const actionType = getActionType(props)

  const handleShowList = useCallback(
    ({ aliases = [] }) => {
      if (!aliases.length) return setMessageData(aliasMessages.noAliasesFound)

      const aliasRows = aliases.map((alias) => {
        return aliasHeaders.map((aliasHeader) => alias[aliasHeader])
      })

      setTableItems(aliasRows)
    },
    [setMessageData]
  )

  const handleAddAliases = useCallback(() => {
    const validAliases = validateAliasesToAdd({ aliasesToAdd })

    const newAliasesCount = Object.keys(validAliases).length
    const hasValidAliases = newAliasesCount === validAliases.length

    if (!hasValidAliases) return setMessageData(aliasMessages.invalidAliases)

    addAliases(validAliases)
      .catch(() => setMessageData(aliasMessages.unexpectedError))
      .then(() => setMessageData(aliasMessages.aliasAdditionSuccess))
  }, [aliasesToAdd, setMessageData])

  const handleDeleteAliases = useCallback(
    ({ aliases = [] }) => {
      const aliasIds = aliases.map(({ id }) => id)
      const validIds = deletedIds.filter((id) => aliasIds.includes(id))
      const hasInvalidIds = deletedIds.length !== validIds.length

      if (hasInvalidIds) return setMessageData(aliasMessages.noAliasIdsFound)

      deleteAliases(validIds)
        .catch(() => setMessageData(aliasMessages.unexpectedError))
        .then(() => setMessageData(aliasMessages.aliasDeletionSuccess))
    },
    [deletedIds]
  )

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.SHOW_LIST:
          fetchConfiguration().then(handleShowList)
          break

        case actionTypes.DELETE_ALIAS:
          fetchConfiguration().then(handleDeleteAliases)
          break

        case actionTypes.ADD_ALIAS:
          handleAddAliases()
          break

        default:
          break
      }
    },
    [actionType, handleAddAliases, handleDeleteAliases, handleShowList]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      {list && (
        <LogWrapper variant={parameterTypes.TABLE} buttonGroups={buttonGroups}>
          <Table headers={aliasHeaders} rows={pageData} />
        </LogWrapper>
      )}
    </>
  )
}
