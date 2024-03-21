import * as React from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import listeners from '@libs/listeners'
import { deletePageEvents, fetchConfiguration } from '@src/helpers/event.helpers.js'
import { getParamsByType } from '../../commander.helpers'
import { parameterTypes } from '../../constants/commands.constants'
import { LogCard, LogContainer, TableLog, useMessageLog } from '../../modules/Log'
import {
  MAX_ITEMS,
  eventActionTypes,
  internalEventTableOptions,
  listenersTableOptions,
  triggerableEvents
} from './CommandEvent.constants'
import {
  getActionType,
  triggerChangeEvent,
  turnPageEventsToTableItems,
  validateElement
} from './CommandEvent.helpers'
import { eventMessages } from './CommandEvent.messages'

export const CommandEvent = ({ props, terminal: { command, params, finish } }) => {
  const { delete: deletedIds, trigger: eventToTrigger, value: valueToInsert } = props

  const [internPageEvents, setInternPageEvents] = useState([])
  const [eventListeners, setEventListeners] = useState([])

  const { log: messageLog, setMessage } = useMessageLog()

  const actionType = getActionType(props)

  const handleShowList = useCallback(async () => {
    const config = await fetchConfiguration()

    if (!config.pageEvents.length) throw new Error('noEventsFound')

    setInternPageEvents(config.pageEvents)
  }, [])

  const handleDeleteEvent = useCallback(async () => {
    const config = await fetchConfiguration()

    const idsToDelete = deletedIds.filter(deletedId =>
      config.pageEvents.some(({ id }) => id === deletedId)
    )
    const hasInvalidIds = deletedIds.length !== idsToDelete.length

    if (!config.pageEvents.length) throw new Error('noEventsFound')
    if (hasInvalidIds) throw new Error('invalidEventIds')

    await deletePageEvents(idsToDelete)
    setMessage(eventMessages.eventDeleteSuccess)
  }, [deletedIds, setMessage])

  const handleTriggerEvent = useCallback(() => {
    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

    if (!paramElements.length) throw new Error('missingElements')

    switch (eventToTrigger) {
      case triggerableEvents.CLICK: {
        paramElements.forEach(element => element.click())
        setMessage(eventMessages.elementsClickedSuccess)
        break
      }

      case triggerableEvents.CHANGE: {
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
    const eventListenerItems = listeners.getListeners()

    setEventListeners(eventListenerItems)
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
  const handleEventsDelete = async ({ selectedRows }) => {
    const eventIdsToDelete = selectedRows.map(({ id }) => id)

    await deletePageEvents(eventIdsToDelete).catch(onError)
    await handleShowList().catch(onError)
  }

  const hasInternPageEvents = Boolean(internPageEvents.length)
  const hasListeners = Boolean(eventListeners.length)

  return (
    <LogContainer>
      {messageLog && (
        <LogCard variant={messageLog.type} command={command}>
          {messageLog.message}
        </LogCard>
      )}

      {!messageLog && hasInternPageEvents && (
        <TableLog
          id="pageEvents"
          command={command}
          maxItems={MAX_ITEMS}
          tableItems={internPageEvents}
          options={internalEventTableOptions}
          onSelectionDelete={handleEventsDelete}
          hasSelection
        />
      )}

      {!messageLog && hasListeners && (
        <TableLog
          id="listeners"
          command={command}
          maxItems={MAX_ITEMS}
          tableItems={eventListeners}
          options={listenersTableOptions}
          hasSelection={false}
        />
      )}
    </LogContainer>
  )
}
