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
  terminal: { command, setMessageData, params }
}) => {
  const { list, delete: deletedIds, trigger: eventToTrigger } = props

  const [tableItems, setTableItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { buttonGroups, pages, pageNumber } = usePaginationGroups({
    items: tableItems,
    maxItems: 10
  })

  const actionType = getActionType(props)

  const handleShowList = useCallback(
    ({ pageEvents = [] }) => {
      if (!pageEvents.length) return setMessageData(eventMessages.noEventsFound)

      const pageEventsRows = pageEvents.map((pageEvent) => {
        return eventRows.map((eventRow) => pageEvent[eventRow])
      })

      setTableItems(pageEventsRows)
      setIsLoading(false)
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

      deletePageEvents(idsToDelete)
        .catch(() => setMessageData(eventMessages.unexpectedError))
        .then(() => setMessageData(eventMessages.eventDeleteSuccess))
        .finally(() => setIsLoading(false))
    },
    [deletedIds, setMessageData]
  )

  const handleTriggerEvent = useCallback(() => {
    const isEventValid = supportedEventNames.includes(eventToTrigger)

    if (!isEventValid) return setMessageData(eventMessages.invalidEventName)

    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

    if (eventToTrigger === supportedEvents.CLICK) {
      paramElements.forEach((element) => element.click())

      setMessageData(eventMessages.elementsClickedSuccess)
    }

    setIsLoading(false)
  }, [eventToTrigger])

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

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      {list && (
        <LogWrapper variant={parameterTypes.TABLE} buttonGroups={buttonGroups}>
          <Carousel itemInView={pageNumber}>
            {pages.map((page, currentPageNumber) => {
              return (
                <CarouselItem key={currentPageNumber}>
                  <Table
                    headers={eventRows}
                    rows={page}
                    widths={[20, 20, 60]}
                  />
                </CarouselItem>
              )
            })}
          </Carousel>
        </LogWrapper>
      )}
    </>
  )
}
