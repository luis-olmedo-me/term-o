import React, { useEffect, useState, useMemo } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'
import { aliasHeaders } from './CommandAlias.constants'
import { eventTypes } from 'src/constants/events.constants.js'
import { backgroundRequest } from 'src/helpers/event.helpers.js'

export const CommandAlias = ({
  command,
  props: { list, delete: deletedIds, add: aliasesToAdd },
  aliases,
  setMessageData
}) => {
  const [idsToDelete, setIdsToDelete] = useState([])
  const staticAliases = useMemo(() => aliases, [])

  const aliasesRows = Object.entries(staticAliases)

  const hasAliases = aliasesRows.length > 0

  useEffect(
    function handleAliases() {
      if (hasAliases || !list) return

      setMessageData({
        type: parameterTypes.INFO,
        message: 'There are no aliases registered.'
      })
    },
    [hasAliases, aliasesToAdd]
  )

  useEffect(
    function handleAliases() {
      if (!aliasesToAdd.length) return

      const newAliases = aliasesToAdd.reduce((totalAliases, alias) => {
        return { ...totalAliases, ...alias }
      }, {})

      backgroundRequest({
        eventType: eventTypes.ADD_ALIAS,
        data: newAliases
      })

      setMessageData({
        type: parameterTypes.SUCCESS,
        message: `Aliases added: ${Object.keys(newAliases).join(', ')}`
      })
    },
    [aliasesToAdd]
  )

  useEffect(
    function validateDeletedIds() {
      const aliasesKeys = Object.keys(staticAliases)
      const validDeltedIds = deletedIds.filter((keyToDelete) => {
        return aliasesKeys.includes(keyToDelete)
      })

      if (deletedIds.length !== validDeltedIds.length) {
        setMessageData({
          type: parameterTypes.ERROR,
          message: `The following ids were not found: ${deletedIds.join(', ')}`
        })
      }

      setIdsToDelete(validDeltedIds)
    },
    [deletedIds, staticAliases]
  )

  useEffect(
    function deletePageEvents() {
      if (!idsToDelete.length) return

      backgroundRequest({
        eventType: eventTypes.DELETE_ALIAS,
        data: { aliasesKeysToDelete: idsToDelete }
      })

      setMessageData({
        type: parameterTypes.SUCCESS,
        message: `Deleted ${idsToDelete.length} aliases.`
      })
    },
    [hasAliases, list, idsToDelete]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      {list && (
        <LogWrapper variant={parameterTypes.TABLE}>
          <Table headers={aliasHeaders} rows={aliasesRows} />
        </LogWrapper>
      )}
    </>
  )
}
