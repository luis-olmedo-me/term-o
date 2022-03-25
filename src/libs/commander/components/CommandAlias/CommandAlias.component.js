import React, { useEffect, useState, useCallback } from 'react'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'
import { aliasHeaders } from './CommandAlias.constants'
import { eventTypes } from 'src/constants/events.constants.js'
import {
  backgroundRequest,
  fetchConfiguration
} from 'src/helpers/event.helpers.js'
import { getActionType, validateAliasesToAdd } from './CommandAlias.helpers'
import { aliasMessages } from './CommandAlias.messages'

export const CommandAlias = ({
  props,
  terminal: { setMessageData, command }
}) => {
  const { list, delete: deletedIds, add: aliasesToAdd } = props

  const [tableData, setTableData] = useState([])

  const actionType = getActionType(props)

  const handleShowList = useCallback(
    ({ aliases = [] }) => {
      if (!aliases.length) return setMessageData(aliasMessages.noAliasesFound)

      const aliasRows = aliases.map((alias) => {
        return aliasHeaders.map((aliasHeader) => alias[aliasHeader])
      })

      setTableData(aliasRows)
    },
    [setMessageData]
  )

  const handleAddAliases = useCallback(() => {
    const validAliases = validateAliasesToAdd(aliasesToAdd)

    const newAliasesCount = Object.keys(validAliases).length
    const hasValidAliases = newAliasesCount === validAliases.length

    if (!hasValidAliases) return setMessageData(aliasMessages.invalidAliases)

    backgroundRequest({
      eventType: eventTypes.ADD_ALIAS,
      data: validAliases
    })

    setMessageData(aliasMessages.aliasAdditionSuccess)
  }, [aliasesToAdd, setMessageData])

  const handleDeleteAliases = useCallback(
    ({ aliases = [] }) => {
      const aliasIds = aliases.map(({ id }) => id)
      const validIds = deletedIds.filter((id) => aliasIds.includes(id))
      const hasInvalidIds = deletedIds.length !== validIds.length

      if (hasInvalidIds) return setMessageData(aliasMessages.noAliasIdsFound)

      backgroundRequest({
        eventType: eventTypes.DELETE_ALIAS,
        data: { aliasIdsToDelete: validIds }
      })

      setMessageData(aliasMessages.aliasDeletionSuccess)
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
        <LogWrapper variant={parameterTypes.TABLE}>
          <Table headers={aliasHeaders} rows={tableData} />
        </LogWrapper>
      )}
    </>
  )
}
