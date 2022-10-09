import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { Log, useMessageLog, usePaginationActions } from '../../modules/Log'
import { Table } from 'modules/components/Table/Table.component'
import {
  eventActionTypes,
  eventRows,
  supportedEventNames,
  supportedEvents
} from './CommandEvent.constants'
import {
  fetchConfiguration,
  deletePageEvents
} from 'src/helpers/event.helpers.js'
import { eventMessages } from './CommandEvent.messages'
import { getActionType } from './CommandEvent.helpers'
import { getParamsByType } from '../../commander.helpers'
import { Carousel, CarouselItem } from 'modules/components/Carousel'

export const CommandEvent = ({
  props,
  terminal: { command, params, finish }
}) => {
  const {
    delete: deletedIds,
    trigger: eventToTrigger,
    value: valueToInsert
  } = props

  const [tableItems, setTableItems] = useState([])

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: tableItems,
    maxItems: 10
  })

  const actionType = getActionType(props)

  const handleShowList = useCallback(
    ({ pageEvents = [] }) => {
      if (!pageEvents.length) return setMessage(eventMessages.noEventsFound)

      const pageEventsRows = pageEvents.map((pageEvent) => {
        return eventRows.map((eventRow) => {
          const rowValue = pageEvent[eventRow]

          return {
            value: rowValue,
            actions: [
              {
                id: 'copy-value',
                title: 'Copy value',
                onClick: () => navigator.clipboard.writeText(rowValue),
                Component: '❏'
              }
            ]
          }
        })
      })

      setTableItems(pageEventsRows)
      finish()
    },
    [setMessage]
  )

  const handleDeleteEvent = useCallback(
    ({ pageEvents = [] }) => {
      if (!pageEvents.length) return setMessage(eventMessages.noEventsFound)

      const idsToDelete = deletedIds.filter((id) => {
        return pageEvents.some((pageEvent) => pageEvent.id === id)
      })

      if (deletedIds.length !== idsToDelete.length) {
        return setMessage(eventMessages.invalidEventIds, {
          invalidIds: deletedIds.join(', ')
        })
      }

      deletePageEvents(idsToDelete)
        .catch(() => setMessage(eventMessages.unexpectedError))
        .then(() => setMessage(eventMessages.eventDeleteSuccess))
        .then(() => finish())
    },
    [deletedIds, setMessage, finish]
  )

  const handleTriggerEvent = useCallback(() => {
    const isEventValid = supportedEventNames.includes(eventToTrigger)

    if (!isEventValid) return setMessage(eventMessages.invalidEventName)

    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

    if (eventToTrigger === supportedEvents.CLICK) {
      paramElements.forEach((element) => element.click())

      setMessage(eventMessages.elementsClickedSuccess)
    } else if (eventToTrigger === supportedEvents.CHANGE) {
      const hasAllInputs = paramElements.every(
        (element) => element.tagName === 'INPUT'
      )

      if (!hasAllInputs) return setMessage(eventMessages.invalidElements)

      paramElements.forEach((element) => {
        element.value = valueToInsert
      })

      setMessage(eventMessages.elementsChangedSuccess)
    }

    finish()
  }, [eventToTrigger, valueToInsert, finish])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case eventActionTypes.SHOW_LIST:
          fetchConfiguration()
            .then(handleShowList)
            .catch(() => setMessage(eventMessages.unexpectedError))
          break

        case eventActionTypes.DELETE_EVENT:
          fetchConfiguration()
            .then(handleDeleteEvent)
            .catch(() => setMessage(eventMessages.unexpectedError))
          break

        case eventActionTypes.TRIGGER:
          handleTriggerEvent()
          break

        default:
          break
      }
    },
    [actionType, handleDeleteEvent, handleShowList, handleTriggerEvent]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
        <Log variant={parameterTypes.TABLE} actionGroups={paginationActions}>
          <Carousel itemInView={pageNumber}>
            {pages.map((page, currentPageNumber) => {
              return (
                <CarouselItem key={currentPageNumber}>
                  <Table
                    headers={eventRows}
                    rows={page}
                    widths={[20, 15, 15, 50]}
                  />
                </CarouselItem>
              )
            })}
          </Carousel>
        </Log>
      )}
    </>
  )
}
