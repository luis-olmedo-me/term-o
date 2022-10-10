import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { Log, useMessageLog, usePaginationActions } from '../../modules/Log'
import { Table } from 'modules/components/Table/Table.component'
import {
  eventActionTypes,
  eventRows,
  inputsChangeTrigerables,
  supportedEvents
} from './CommandEvent.constants'
import {
  fetchConfiguration,
  deletePageEvents
} from 'src/helpers/event.helpers.js'
import { eventMessages } from './CommandEvent.messages'
import {
  getActionType,
  turnPageEventsToTableItems
} from './CommandEvent.helpers'
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
        paramElements.forEach((element) => {
          element.dispatchEvent(new MouseEvent('click'))
        })

        setMessage(eventMessages.elementsClickedSuccess)
        break
      }

      case supportedEvents.CHANGE: {
        const hasAllInputs = paramElements.every((element) =>
          inputsChangeTrigerables.includes(element.tagName)
        )

        if (!hasAllInputs) return setMessage(eventMessages.invalidElements)

        paramElements.forEach((element) => {
          element.value = valueToInsert
          element.dispatchEvent(new Event('change'))
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
