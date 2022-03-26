import React, { useEffect, useState, useCallback } from 'react'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'
import { eventRows } from './CommandEvent.constants'
import { eventTypes } from 'src/constants/events.constants.js'
import {
  backgroundRequest,
  fetchConfiguration
} from 'src/helpers/event.helpers.js'
import { eventMessages } from './CommandEvent.messages'
import { getActionType } from './CommandEvent.helpers'

export const CommandEvent = ({
  props,
  terminal: { command, setMessageData }
}) => {
  const { list, delete: deletedIds } = props

  const [tableData, setTableData] = useState([])

  const actionType = getActionType(props)

  const handleShowList = useCallback(
    ({ pageEvents = [] }) => {
      if (!pageEvents.length) return setMessageData(eventMessages.noEventsFound)

      const pageEventsRows = pageEvents.map((pageEvent) => {
        return eventRows.map((eventRow) => pageEvent[eventRow])
      })

      setTableData(pageEventsRows)
    },
    [setMessageData]
  )

  const handleDeleteEvent = useCallback(
    ({ pageEvents = [] }) => {
      if (!pageEvents.length) return setMessageData(eventMessages.noEventsFound)

      const idsToDelete = deletedIds.filter((id) => {
        return pageEvents.some((pageEvent) => pageEvent.id === id)
      })

      if (deletedIds.length !== idsToDelete.length) {
        return setMessageData(eventMessages.invalidEventIds, {
          invalidIds: deletedIds.join(', ')
        })
      }

      backgroundRequest({
        eventType: eventTypes.DELETE_PAGES_EVENT,
        data: { ids: idsToDelete }
      })

      setMessageData(eventMessages.eventDeleteSuccess)
    },
    [deletedIds, setMessageData]
  )

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.SHOW_LIST:
          fetchConfiguration().then(handleShowList)
          break

        case actionTypes.DELETE_EVENT:
          fetchConfiguration().then(handleDeleteEvent)
          break

        default:
          break
      }
    },
    [actionType, handleDeleteEvent, handleShowList]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      {list && (
        <LogWrapper variant={parameterTypes.TABLE}>
          <Table headers={eventRows} rows={tableData} />
        </LogWrapper>
      )}
    </>
  )
}
