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
import { commander } from '../../commander.service'
import { getActionType } from './CommandAlias.helpers'

export const CommandAlias = ({
  props,
  terminal: { setMessageData, command }
}) => {
  const { list, delete: deletedIds, add: aliasesToAdd } = props

  const [tableData, setTableData] = useState([])

  const actionType = getActionType(props)

  const handleShowList = useCallback(
    ({ aliases = [] }) => {
      if (!aliases.length) {
        return setMessageData({
          type: parameterTypes.INFO,
          message: 'There are no aliases registered.'
        })
      }

      const aliasRows = aliases.map((alias) => {
        return aliasHeaders.map((aliasHeader) => alias[aliasHeader])
      })

      setTableData(aliasRows)
    },
    [setMessageData]
  )

  const handleAddAliases = useCallback(() => {
    const newAliasesAsObject = aliasesToAdd.reduce((totalAliases, alias) => {
      return { ...totalAliases, ...alias }
    }, {})

    const validatedAliases = Object.entries(newAliasesAsObject).reduce(
      (totalAliases, [name, command]) => {
        return commander.commandNames.includes(name)
          ? totalAliases
          : [...totalAliases, { name, command }]
      },
      []
    )

    const newAliasesCount = Object.keys(validatedAliases).length
    const hasValidAliases =
      newAliasesCount && newAliasesCount === validatedAliases.length

    if (!hasValidAliases) {
      return setMessageData({
        type: parameterTypes.ERROR,
        message: 'Invalid alias(es).'
      })
    }

    backgroundRequest({
      eventType: eventTypes.ADD_ALIAS,
      data: validatedAliases
    })

    setMessageData({
      type: parameterTypes.SUCCESS,
      message: `Aliases added: ${Object.keys(newAliasesAsObject).join(', ')}`
    })
  }, [aliasesToAdd, setMessageData])

  const handleDeleteAliases = useCallback(
    ({ aliases = [] }) => {
      const aliasIds = aliases.map(({ id }) => id)
      const idsToDelete = deletedIds.filter((id) => aliasIds.includes(id))

      if (deletedIds.length !== idsToDelete.length) {
        return setMessageData({
          type: parameterTypes.ERROR,
          message: `The following ids were not found: ${deletedIds.join(', ')}`
        })
      }

      backgroundRequest({
        eventType: eventTypes.DELETE_ALIAS,
        data: { aliasIdsToDelete: idsToDelete }
      })

      setMessageData({
        type: parameterTypes.SUCCESS,
        message: `Deleted ${idsToDelete.length} alias(es).`
      })
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
