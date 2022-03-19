import React, { useEffect, useState, useMemo } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'
import { eventRows } from './CommandEvent.constants'
import { eventTypes } from 'src/constants/events.constants.js'
import { backgroundRequest } from 'src/helpers/event.helpers.js'

export const CommandEvent = ({
  props: { list, delete: deletedIds },
  terminal: { command, setMessageData }
}) => {
  const [idsToDelete, setIdsToDelete] = useState([])
  const [pageEvents, setPageEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const pageEventsRows = pageEvents.map((pageEvent) => {
    return eventRows.map((eventRow) => pageEvent[eventRow])
  })

  const hasPageEvents = pageEvents.length > 0

  useEffect(function getPageEvents() {
    const receivedPageEvents = (response) => {
      const updatedPageEvents = response?.response?.pageEvents || []

      setPageEvents(updatedPageEvents)
      setIsLoading(false)
    }

    backgroundRequest({
      eventType: eventTypes.GET_CONFIGURATION,
      callback: receivedPageEvents
    })
  }, [])

  useEffect(
    function handleEmptyPageEvents() {
      if (isLoading || hasPageEvents || !list) return

      setMessageData({
        type: parameterTypes.INFO,
        message: 'There are no page events registered.'
      })
    },
    [hasPageEvents, list, isLoading]
  )

  useEffect(
    function validateDeletedIds() {
      const validDeltedIds = deletedIds.filter((id) => {
        return pageEvents.some((pageEvent) => pageEvent.id === id)
      })

      if (deletedIds.length !== validDeltedIds.length) {
        setMessageData({
          type: parameterTypes.ERROR,
          message: `The following ids were not found: ${deletedIds.join(', ')}`
        })
      }

      setIdsToDelete(validDeltedIds)
    },
    [deletedIds, pageEvents]
  )

  useEffect(
    function deletePageEvents() {
      if (!idsToDelete.length) return

      backgroundRequest({
        eventType: eventTypes.DELETE_PAGES_EVENT,
        data: { ids: idsToDelete }
      })

      setMessageData({
        type: parameterTypes.SUCCESS,
        message: `Deleted ${idsToDelete.length} page events.`
      })
    },
    [hasPageEvents, list, idsToDelete]
  )

  return (
    isLoading && (
      <>
        <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

        {list && (
          <LogWrapper variant={parameterTypes.TABLE}>
            <Table headers={eventRows} rows={pageEventsRows} />
          </LogWrapper>
        )}
      </>
    )
  )
}
