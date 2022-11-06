import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { Table } from 'modules/components/Table/Table.component'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import {
  deletePageEvents,
  fetchConfiguration
} from 'src/helpers/event.helpers.js'
import { getParamsByType } from '../../commander.helpers'
import { parameterTypes } from '../../constants/commands.constants'
import {
  Log,
  useMessageLog,
  usePaginationActions,
  useTableSelection
} from '../../modules/Log'
import {
  eventActionTypes,
  eventTableOptions,
  supportedEvents
} from './CommandEvent.constants'
import {
  getActionType,
  triggerChangeEvent,
  turnPageEventsToTableItems,
  validateElement
} from './CommandEvent.helpers'
import { eventMessages } from './CommandEvent.messages'

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

  const handleDeleteEventsFromTableItems = async ({ selectedRows }) => {
    const eventIdsToDelete = selectedRows.map(([idRow]) => idRow.value)

    await deletePageEvents(eventIdsToDelete).catch(() =>
      setMessage(eventMessages.unexpectedError)
    )

    await fetchConfiguration()
      .then(handleShowList)
      .catch(() => setMessage(eventMessages.unexpectedError))

    clearSelection()
  }

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: tableItems,
    maxItems: 10
  })
  const { clearSelection, tableSelectionProps, selectionActions } =
    useTableSelection({
      handleSkullClick: handleDeleteEventsFromTableItems,
      currentRows: pages[pageNumber],
      isEnabled: props.now
    })

  const actionType = getActionType(props)

  const handleShowList = useCallback(
    ({ pageEvents = [] }) => {
      if (!pageEvents.length) return setMessage(eventMessages.noEventsFound)

      const pageEventsRows = turnPageEventsToTableItems({ pageEvents })

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
    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

    if (!paramElements.length) return setMessage(eventMessages.missingElements)

    switch (eventToTrigger) {
      case supportedEvents.CLICK: {
        paramElements.forEach((element) => element.click())

        setMessage(eventMessages.elementsClickedSuccess)
        break
      }

      case supportedEvents.CHANGE: {
        const areElementsValid = paramElements.every(validateElement)

        if (!areElementsValid) return setMessage(eventMessages.invalidElements)

        paramElements.forEach((element) => {
          triggerChangeEvent({ element, value: valueToInsert })
        })

        setMessage(eventMessages.elementsChangedSuccess)
        break
      }

      default:
        return setMessage(eventMessages.invalidEventName)
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
        <Log
          variant={parameterTypes.TABLE}
          actionGroups={[...paginationActions, ...selectionActions]}
        >
          <Carousel itemInView={pageNumber}>
            {pages.map((page, currentPageNumber) => {
              return (
                <CarouselItem key={currentPageNumber}>
                  <Table
                    {...tableSelectionProps}
                    rows={page}
                    options={eventTableOptions}
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
