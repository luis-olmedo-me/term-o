import React, { useEffect, useState, useCallback } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
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
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { getParamsByType } from '../../commander.helpers'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'

export const CommandEvent = ({
  props,
  terminal: { command, setMessageData, params, finish }
}) => {
  const {
    delete: deletedIds,
    trigger: eventToTrigger,
    value: valueToInsert
  } = props

  const [tableItems, setTableItems] = useState([])

  const { buttonGroups, pages, pageNumber } = usePaginationGroups({
    items: tableItems,
    maxItems: 10
  })

  const actionType = getActionType(props)

  const handleShowList = useCallback(
    ({ pageEvents = [] }) => {
      if (!pageEvents.length) {
        setMessageData(eventMessages.noEventsFound)
        finish()
        return
      }

      const pageEventsRows = pageEvents.map((pageEvent) => {
        return eventRows.map((eventRow) => pageEvent[eventRow])
      })

      setTableItems(pageEventsRows)
      finish()
    },
    [setMessageData, finish]
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

      deletePageEvents(idsToDelete)
        .catch(() => setMessageData(eventMessages.unexpectedError))
        .then(() => setMessageData(eventMessages.eventDeleteSuccess))
        .then(() => finish())
    },
    [deletedIds, setMessageData, finish]
  )

  const handleTriggerEvent = useCallback(() => {
    const isEventValid = supportedEventNames.includes(eventToTrigger)

    if (!isEventValid) return setMessageData(eventMessages.invalidEventName)

    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

    if (eventToTrigger === supportedEvents.CLICK) {
      paramElements.forEach((element) => element.click())

      setMessageData(eventMessages.elementsClickedSuccess)
    } else if (eventToTrigger === supportedEvents.CHANGE) {
      const hasAllInputs = paramElements.every(
        (element) => element.tagName === 'INPUT'
      )

      if (!hasAllInputs) return setMessageData(eventMessages.invalidElements)

      paramElements.forEach((element) => {
        element.value = valueToInsert
      })

      setMessageData(eventMessages.elementsChangedSuccess)
    }

    finish()
  }, [eventToTrigger, valueToInsert, finish])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case eventActionTypes.SHOW_LIST:
          fetchConfiguration().then(handleShowList)
          break

        case eventActionTypes.DELETE_EVENT:
          fetchConfiguration().then(handleDeleteEvent)
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

  const hasPages = pages.length > 0

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.TABLE} buttonGroups={buttonGroups}>
        {hasPages && (
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
        )}
      </LogWrapper>
    </>
  )
}
