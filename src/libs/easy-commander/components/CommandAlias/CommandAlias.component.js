import React, { useEffect, useState, useMemo } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'
import { aliasHeaders } from './CommandAlias.constants'
import { eventTypes } from 'src/constants/events.constants.js'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { commander } from '../../easyCommander.service'

export const CommandAlias = ({
  props: { list, delete: deletedIds, add: aliasesToAdd },
  terminal: { setMessageData, command }
}) => {
  const [idsToDelete, setIdsToDelete] = useState([])
  const [aliases, setAliases] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(function getAliases() {
    const receivedAliases = (response) => {
      const updatedAliases = response?.response?.aliases || []

      setAliases(updatedAliases)
      setIsLoading(false)
    }

    backgroundRequest({
      eventType: eventTypes.GET_CONFIGURATION,
      callback: receivedAliases
    })
  }, [])

  const aliasesRows = aliases.map((alias) => {
    return aliasHeaders.map((aliasHeader) => alias[aliasHeader])
  })
  const hasAliases = aliases.length > 0

  useEffect(
    function handleAliases() {
      if (isLoading || hasAliases || !list) return

      setMessageData({
        type: parameterTypes.INFO,
        message: 'There are no aliases registered.'
      })
    },
    [hasAliases, aliasesToAdd, isLoading]
  )

  useEffect(
    function handleAliases() {
      if (isLoading || !aliasesToAdd.length) return

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
    },
    [aliasesToAdd, isLoading]
  )

  useEffect(
    function validateDeletedIds() {
      if (isLoading) return

      const aliasIds = aliases.map(({ id }) => id)
      const aliasesToDelete = deletedIds.filter(({ id }) =>
        aliasIds.includes(id)
      )

      if (deletedIds.length !== aliasesToDelete.length) {
        return setMessageData({
          type: parameterTypes.ERROR,
          message: `The following ids were not found: ${deletedIds.join(', ')}`
        })
      }
      const aliasIdsToDelete = aliasesToDelete.map(({ id }) => id)

      setIdsToDelete(aliasIdsToDelete)
    },
    [deletedIds, aliases, isLoading]
  )

  useEffect(
    function deleteAliases() {
      if (!idsToDelete.length) return

      backgroundRequest({
        eventType: eventTypes.DELETE_ALIAS,
        data: { aliasIdsToDelete: idsToDelete }
      })

      setMessageData({
        type: parameterTypes.SUCCESS,
        message: `Deleted ${idsToDelete.length} aliases.`
      })
    },
    [hasAliases, list, idsToDelete]
  )

  return (
    !isLoading && (
      <>
        <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

        {list && (
          <LogWrapper variant={parameterTypes.TABLE}>
            <Table headers={aliasHeaders} rows={aliasesRows} />
          </LogWrapper>
        )}
      </>
    )
  )
}
