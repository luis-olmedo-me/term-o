import * as React from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { deletePageEvents, fetchConfiguration } from '@src/helpers/event.helpers.js'
import { getParamsByType } from '../../commander.helpers'
import { parameterTypes } from '../../constants/commands.constants'
import { InternalEventListLog, LogCard, LogContainer, useMessageLog } from '../../modules/Log'
import { eventActionTypes, MAX_ITEMS, supportedEvents } from './CommandEvent.constants'
import {
  getActionType,
  triggerChangeEvent,
  turnPageEventsToTableItems,
  validateElement
} from './CommandEvent.helpers'
import { eventMessages } from './CommandEvent.messages'

export const CommandEvent = ({ props, terminal: { command, params, finish } }) => {
  const { delete: deletedIds, trigger: eventToTrigger, value: valueToInsert } = props

  const [tableItems, setTableItems] = useState([])

  const { log: messageLog, setMessage } = useMessageLog()

  const actionType = getActionType(props)

  const handleShowList = useCallback(async () => {
    const { pageEvents = [] } = await fetchConfiguration()

    const pageEventsRows = turnPageEventsToTableItems({ pageEvents })

    if (!pageEvents.length) throw new Error('noEventsFound')

    setTableItems(pageEventsRows)
  }, [setMessage])

  const handleDeleteEvent = useCallback(async () => {
    const { pageEvents = [] } = await fetchConfiguration()

    const idsToDelete = deletedIds.filter(id => pageEvents.some(pageEvent => pageEvent.id === id))
    const hasInvalidIds = deletedIds.length !== idsToDelete.length

    if (!pageEvents.length) throw new Error('noEventsFound')
    if (hasInvalidIds) throw new Error('invalidEventIds')

    await deletePageEvents(idsToDelete)
    setMessage(eventMessages.eventDeleteSuccess)
  }, [deletedIds, setMessage])

  const handleTriggerEvent = useCallback(() => {
    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

    if (!paramElements.length) throw new Error('missingElements')

    switch (eventToTrigger) {
      case supportedEvents.CLICK: {
        paramElements.forEach(element => element.click())
        setMessage(eventMessages.elementsClickedSuccess)
        break
      }

      case supportedEvents.CHANGE: {
        const areElementsValid = paramElements.every(validateElement)

        if (!areElementsValid) throw new Error('invalidElements')

        paramElements.forEach(element => triggerChangeEvent({ element, value: valueToInsert }))
        setMessage(eventMessages.elementsChangedSuccess)
        break
      }

      default:
        throw new Error('invalidEventName')
    }
  }, [eventToTrigger, valueToInsert])

  const handleShowListeners = useCallback(() => {
    setMessage(eventMessages.elementsChangedSuccess)
  }, [setMessage])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case eventActionTypes.SHOW_LIST:
        return await handleShowList()

      case eventActionTypes.SHOW_LISTENERS_LIST:
        return handleShowListeners()

      case eventActionTypes.DELETE_EVENT:
        return await handleDeleteEvent()

      case eventActionTypes.TRIGGER:
        return handleTriggerEvent()

      case eventActionTypes.NONE:
        throw new Error('unexpectedError')
    }
  }, [actionType, handleShowList, handleDeleteEvent, handleTriggerEvent, handleShowListeners])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(eventMessages[error?.message] || eventMessages.unexpectedError)
        finish({ break: true })
      }

      doAction()
        .then(finish)
        .catch(handleError)
    },
    [doAction, setMessage, finish]
  )

  const onError = error =>
    setMessage(eventMessages[error?.message] || eventMessages.unexpectedError)
  const handleDeleteEventsFromTableItems = async ({ selectedRows }) => {
    const eventIdsToDelete = selectedRows.map(([idRow]) => idRow.value)

    await deletePageEvents(eventIdsToDelete).catch(onError)
    await handleShowList().catch(onError)
  }

  return (
    <LogContainer>
      {messageLog && (
        <LogCard variant={messageLog.type} command={command}>
          {messageLog.message}
        </LogCard>
      )}

      {!messageLog && (
        <InternalEventListLog
          tableItems={tableItems}
          maxItems={MAX_ITEMS}
          onDelete={handleDeleteEventsFromTableItems}
          command={command}
        />
      )}
    </LogContainer>
  )
}
