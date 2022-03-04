import React, { useEffect, useState } from 'react'
import { parameterTypes } from '../../easyCommander.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'
import { aliasRows } from './CommandAlias.constants'
import { eventTypes } from 'src/constants/events.constants.js'
import { backgroundRequest } from 'src/helpers/event.helpers.js'

const aliasesTemp = []

export const CommandAlias = ({
  command,
  props: { list, delete: deletedIds },
  aliases = aliasesTemp,
  setMessageData
}) => {
  const [idsToDelete, setIdsToDelete] = useState([])
  const pageEventsRows = aliases.map((pageEvent) => {
    return aliasRows.map((eventRow) => pageEvent[eventRow])
  })

  const hasPageEvents = aliases.length > 0

  useEffect(
    function handleEmptyPageEvents() {
      if (hasPageEvents || !list) return

      setMessageData({
        type: parameterTypes.INFO,
        message: 'There are no aliases registered.'
      })
    },
    [hasPageEvents, list]
  )

  useEffect(
    function validateDeletedIds() {
      const validDeltedIds = deletedIds.filter((id) => {
        return aliases.some((pageEvent) => pageEvent.id === id)
      })

      if (deletedIds.length !== validDeltedIds.length) {
        setMessageData({
          type: parameterTypes.ERROR,
          message: `The following ids were not found: ${deletedIds.join(', ')}`
        })
      }

      setIdsToDelete(validDeltedIds)
    },
    [deletedIds, aliases]
  )

  useEffect(
    function deletePageEvents() {
      if (!idsToDelete.length) return

      // backgroundRequest({
      //   eventType: eventTypes.DELETE_PAGES_EVENT,
      //   data: { ids: idsToDelete }
      // })

      setMessageData({
        type: parameterTypes.SUCCESS,
        message: `Deleted ${idsToDelete.length} aliases.`
      })
    },
    [hasPageEvents, list, idsToDelete]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      {list && (
        <LogWrapper variant={parameterTypes.TABLE}>
          <Table headers={aliasRows} rows={pageEventsRows} />
        </LogWrapper>
      )}
    </>
  )
}
